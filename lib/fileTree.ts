import fs from "fs";
import matter from "gray-matter";
import path from "path";

/**
 * The interface for a file
 */
interface File {
  /**
   * the path to the file. Relative to the root directory.
   */
  path: string;
}

/**
 * interface for required frontmatter for any page
 */
interface PageFrontmatter {
  date: string;
  description: string;
  draft: boolean;
  title: string;
}

type PageSlug = string;

/**
 * The interface for a page (pages can contain other pages)
 */
interface Page {
  /**
   * Content defined below frontmatter
   */
  content: string | null;

  /**
   * date field from frontmatter
   */
  date: string | null;

  /**
   * Description of the page
   * from description field of frontmatter
   */
  description: string | null;

  /**
   * Path to the directory containing this content file.
   * Relatvie to the root directory.
   */
  dir: string;

  /**
   * if true the content is marked as adraft in frontmatter
   * from the draft field of frontmatter
   */
  draft: boolean;

  /**
   * information about the file associated with the page
   */
  file: File | null;

  /**
   * true if this is the home page
   */
  isHome: boolean;

  /**
   * True if kind is section
   */
  isSection: boolean;

  /**
   * The kind of the page. Note that a home page is also a section. It is a
   * superset of the section type. So a page with `kind: home` would also have
   * `isSection: true`
   */
  kind: "home" | "page" | "section";

  /**
   * the next page in the entire tree
   */
  next: PageSlug | null;

  /**
   * the next page in the current section
   */
  nextInSection: PageSlug | null;

  /**
   * the prev page in the entire tree
   */
  prev: PageSlug | null;

  /**
   * the prev page in the current section
   */
  prevInSection: PageSlug | null;

  /**
   * the title for this page
   * from title in frontmatter
   */
  title: string;

  /**
   * The section for the page (can be the page itself if the page is a section)
   */
  section: PageSlug;

  /**
   * The parent section for the page
   */
  parent: PageSlug | null;

  /**
   * The page's first section below root
   */
  firstSection: PageSlug | null;

  /**
   * The sections below this page
   */
  sections: PageSlug[];

  /**
   * The regular pages below this page (does not include sections)
   */
  regularPages: PageSlug[];

  /**
   * The pages below this page (includes sections)
   */
  pages: PageSlug[];

  /**
   * The unique slug for this page
   */
  slug: string;
}

/**
 * File info used in parsing
 */
type FileInfo = {
  /**
   * front matter for the page
   */
  frontMatter: PageFrontmatter;
  /**
   * The content of the page
   */
  content: string;
};

/**
 * Parse context used in parsing
 */
type ParseContext = {
  /**
   * Dictionary of slug to page
   */
  pageDict: Record<string, Page>;
  /**
   * The root directory for the current parse context
   */
  rootDirectory: string;
};

/**
 * Parses a directory of md or mdx files and converts them into pages and sections.
 * Sections are folders which contain an `_index.md(x)` file and pages are either
 * normal markdown files in a section or folders which contain an `index.md(x)` file.
 * The root is automatically considered a section, and all folders in the root are
 * automatically considered sections.
 *
 * @param rootDir the root directory for the file tree
 * @returns the root of the file tree
 */
export async function createFileTree(rootDir) {
  const parseContext: ParseContext = {
    rootDirectory: rootDir,
    pageDict: {},
  };
  const root = await parseDirectory(rootDir, undefined, parseContext);
  await walkFileTree(rootDir, root, parseContext);

  // TODO(lukemurray): assign next and previous properties
  return { root, pageDict: parseContext.pageDict };
}

/**
 * Recursively walk the file tree creating pages
 */
async function walkFileTree(
  dir: string,
  parent: Page,
  parseContext: ParseContext
) {
  for await (const dirEntry of await fs.promises.opendir(dir)) {
    const absPath = path.join(dir, dirEntry.name);
    if (dirEntry.isDirectory()) {
      const dirPage = await parseDirectory(absPath, parent, parseContext);
      if (dirPage !== undefined && dirPage.isSection) {
        await walkFileTree(absPath, dirPage, parseContext);
      }
    } else if (dirEntry.isFile()) {
      await parseFile(absPath, parent, parseContext);
    }
  }
}

/**
 * Parses a directory into a page. Creates a page for the directory but searches
 * for an _index.md or index.md file.
 * @param dir The absolute path to the directory to be parsed
 * @param parent The parent page if one exists
 * @returns The page representing the directory
 */
async function parseDirectory(
  dir: string,
  parent: Page | undefined,
  parseContext: ParseContext
): Promise<Page | undefined> {
  const isHome = parent === undefined;
  const { isPage, isSection, indexPath } = await getDirectoryInfo(dir, parent);

  if (!isPage && !isSection) {
    return undefined;
  }

  const page: Page = {
    content: null,
    date: null,
    description: null,
    dir: path.relative(parseContext.rootDirectory, dir),
    draft: false,
    file: null,
    firstSection: null,
    isHome,
    isSection,
    kind: isHome ? "home" : isSection ? "section" : "page",
    next: null,
    nextInSection: null,
    pages: [],
    parent: parent?.slug ?? null,
    prev: null,
    prevInSection: null,
    regularPages: [],
    section: parent?.slug ?? null,
    sections: [],
    slug: "",
    title: path.basename(dir),
  };
  page.slug = createPageSlug(page);

  if (indexPath !== undefined) {
    assignFileInfo(indexPath, page, parseContext);
  }

  if (isSection) {
    page.section = page.slug;
    page.firstSection = isHome
      ? null
      : parent.isHome
      ? page.slug
      : parent.firstSection;
    if (parent !== undefined) {
      parent.sections.push(page.slug);
    }
  }

  if (isPage) {
    if (parent !== undefined) {
      parent.regularPages.push(page.slug);
    }
  }

  if (parent !== undefined) {
    parent.pages.push(page.slug);
  }

  parseContext.pageDict[page.slug] = page;

  return page;
}

/**
 * Parses an md or mdx file into a page
 * @param filePath the absolute path to the file to be parsed
 * @param parent the parent page
 * @returns The page representing the file
 */
async function parseFile(
  filePath: string,
  parent: Page,
  parseContext: ParseContext
): Promise<Page | undefined> {
  if (!isPageFile(filePath)) {
    return undefined;
  }

  const page: Page = {
    content: null,
    date: null,
    description: null,
    draft: false,
    dir: parent.dir,
    file: null,
    isHome: false,
    isSection: false,
    kind: "page",
    next: null,
    nextInSection: null,
    prev: null,
    prevInSection: null,
    title: path.basename(filePath).replace(/\.mdx?$/i, ""),
    section: parent.slug,
    parent: parent.slug,
    firstSection: parent.firstSection,
    sections: [],
    regularPages: [],
    pages: [],
    slug: "",
  };

  page.slug = createPageSlug(page);

  assignFileInfo(filePath, page, parseContext);

  parent.pages.push(page.slug);
  parent.regularPages.push(page.slug);

  parseContext.pageDict[page.slug] = page;

  return page;
}

async function getDirectoryInfo(dir: string, parent: Page | undefined) {
  let isPage = false;
  // home is by default a section (parent === undefined)
  // directories in home are by default a section (parent.parent === undefined)
  let isSection = parent === undefined || parent.parent === undefined;

  let indexPath = undefined;
  for await (const dirEntry of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, dirEntry.name);
    if (dirEntry.isFile()) {
      if (isSectionIndex(entry)) {
        isSection = true;
        indexPath = entry;
        break;
      } else if (isPageIndex(entry)) {
        isPage = true;
        indexPath = entry;
        break;
      }
    }
  }

  return { isPage, isSection, indexPath };
}

function getFileInfo(file: string): FileInfo {
  const fileContents = fs.readFileSync(file, "utf8");
  const { data, content } = matter(fileContents);
  return {
    content,
    frontMatter: data as PageFrontmatter,
  };
}

/**
 * Assigns the file info from the file found at filePath to the passed in page
 * @param filePath Path to a file
 * @param page the page to assign the file info to
 */
function assignFileInfo(
  filePath: string,
  page: Page,
  parseContext: ParseContext
) {
  const { frontMatter, content } = getFileInfo(filePath);
  page.content = content;
  if (frontMatter.description !== undefined) {
    page.description = frontMatter.description;
  }
  if (frontMatter.date !== undefined) {
    page.date = frontMatter.date;
  }
  if (frontMatter.draft !== undefined) {
    page.draft = frontMatter.draft;
  }

  if (frontMatter.title !== undefined) {
    page.title = frontMatter.title;
  }

  page.file = {
    path: path.relative(parseContext.rootDirectory, filePath),
  };
}

function createPageSlug(page: Page): string {
  return `${path.join(
    ...(page.isSection ? ["/", page.dir] : ["/", page.dir, page.title])
  )}`.toLowerCase();
}

function isSectionIndex(entry: string) {
  return entry.match(/_index\.mdx?$/i) !== null;
}

function isPageIndex(entry: string) {
  return entry.match(/(?<!_)index\.mdx?$/i) !== null;
}

function isPageFile(entry: string) {
  return (
    !isPageIndex(entry) && !isSectionIndex(entry) && entry.match(/\.mdx?$/i)
  );
}
