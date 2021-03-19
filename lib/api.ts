import fs from "fs";
import path, { join } from "path";

// this is the root directory
const rootDirectory = join(process.cwd(), "content");

/**
 * Get the path to entry relative to the root directory
 * @param entry
 * @returns
 */
function getRootPath(entry: string) {
  return path.relative(rootDirectory, entry);
}

/**
 * strip the md(x) extension
 * @param entry
 * @returns
 */
function stripMdExtension(entry: string) {
  return entry.replace(/\.mdx?$/i, "");
}

/**
 * strip the (_)index suffix from a path
 * @param entry
 * @returns
 */
function stripIndexSuffix(entry: string) {
  return entry.replace(/_?index$/i, "");
}

/**
 * if the page ends with `_index` it is a section page
 * @param entry
 * @returns
 */
function isPathSectionPage(entry: string) {
  return entry.match(/_index$/i) !== null;
}

/**
 * if the page ends with `index` it is a leaf page
 * @param entry
 * @returns
 */
function isPathLeafPage(entry: string) {
  return entry.match(/(?<!_)index$/i) !== null;
}

/**
 * Helper type to unwrap a promise
 */
type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

/**
 * Information about a page bundle
 */
type BundleInfo = Awaited<ReturnType<typeof getBundleInfo>>;

/**
 * Get information about a leaf or section bundle
 * @param dir
 * @returns
 */
async function getBundleInfo(dir: string, level: number) {
  // root is a section
  let isSectionBundle = level === 0;
  let isLeafBundle = false;
  for await (const f of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, f.name);

    if (f.isFile()) {
      const rootPath = getRootPath(entry);

      const rootPathNoMd = stripMdExtension(rootPath);

      const isSectionPage = isPathSectionPage(rootPathNoMd);
      if (isSectionPage) {
        isSectionBundle = true;
      }

      const isLeafPage = isPathLeafPage(rootPathNoMd);
      if (isLeafPage) {
        isLeafBundle = true;
      }
    }
  }
  return { isSectionBundle, isLeafBundle };
}

/**
 * Walk a directory recursively
 * @param dir the path to a directory
 */
async function* walkMdContent(dir: string, level = 0) {
  const { isSectionBundle, isLeafBundle } = await getBundleInfo(dir, level);
  if (isSectionBundle && isLeafBundle) {
    throw new Error(
      `Cannot mix sections (_index.md(x)) and leaves (index.md). Check ${dir}!
       If you aren't mixing files then make sure you don't have an index.md file in the root.
       The root directory is a section by default and can only contain an _index.md file.`
    );
  }

  for await (const f of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, f.name);
    if (isSectionBundle && f.isDirectory()) {
      yield* walkMdContent(entry, level + 1);
    } else {
      const rootPath = getRootPath(entry);

      const rootPathNoMd = stripMdExtension(rootPath);

      const isSectionPage = isPathSectionPage(rootPathNoMd);

      // leaves are `index.md` files or `foo.md` files in a section
      const isLeafPage =
        isPathLeafPage(rootPathNoMd) || (isSectionBundle && !isSectionPage);

      // remove (_)index suffix
      const rootPathNoIndex = stripIndexSuffix(rootPathNoMd);

      // yield metadata about the file
      yield {
        absolutePath: entry,
        rootPath: rootPath,
        slug: rootPathNoIndex,
        isSection: isSectionPage,
        isLeaf: isLeafPage,
      };
    }
  }
}

// TODO create a content tree of pages
// a page can be home, section, or page
// base it off of https://gohugo.io/variables/page/ and https://gohugo.io/content-management/sections/

export async function getAllContent() {
  const allFiles = [];
  for await (const file of walkMdContent(rootDirectory)) {
    allFiles.push(file);
  }
  return allFiles;
}
