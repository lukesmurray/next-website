import fs from "fs";
import matter from "gray-matter";
import path from "path";

/**
 * The interface for a file. This information is stored along with the page.
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
  date?: string;
  description?: string;
  draft?: boolean;
  title?: string;
  image?: string;
}

/**
 * Type to identify the page slug, makes it easier to read the code
 */
type PageSlug = string;

/**
 * The interface for a page (pages can contain other pages)
 */
interface Page {
  /**
   * Content defined below frontmatter
   */
  content: string;

  /**
   * date field from frontmatter.
   * Assumed to be in one of the following formats.
   *  - "2011-10-10" (date-only form)
   *  - "2011-10-10T14:48:00" (date-time form)
   *  - "2011-10-10T14:48:00.000+09:00"
   *
   * For more info look at the date.parse method in javascript
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#date_time_string_format
   */
  date: Date | null;

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
   * The path to an image. Relative to the file.
   */
  image: string | null;

  /**
   * The kind of the page. Note that a home page is also a section. It is a
   * superset of the section type. So a page with `kind: home` would also have
   * `isSection: true`
   */
  kind: "home" | "page" | "section";

  /**
   * the title for this page
   * from title in frontmatter
   */
  title: string;

  /**
   * The parent section for the page
   */
  parentSlug: PageSlug | null;

  /**
   * The unique slug for this page
   */
  slug: string;
}

/**
 * File info used in parsing the directory tree.
 * Contains the frontmatter and the page content.
 */
type FileParseInfo = {
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
 * Parse context used in parsing.
 * Contains information relevant for the entire parsing process.
 */
type ParseContext = {
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
 */
export async function* parseAllPagesInDir(
  rootDir: string
): AsyncGenerator<Page> {
  const parseContext: ParseContext = {
    rootDirectory: rootDir,
  };
  const root = await parseDirectory(rootDir, undefined, parseContext);
  if (root !== undefined) {
    yield root;
    yield* walkFileTree(rootDir, root, parseContext);
  }
}

/**
 * Recursively walk the file tree parsing pages
 */
async function* walkFileTree(
  dir: string,
  parent: Page,
  parseContext: ParseContext
): AsyncGenerator<Page> {
  for await (const dirEntry of await fs.promises.opendir(dir)) {
    const absPath = path.join(dir, dirEntry.name);
    if (dirEntry.isDirectory()) {
      const dirPage = await parseDirectory(absPath, parent, parseContext);
      if (dirPage !== undefined) {
        yield dirPage;
        if (dirPage.isSection) {
          yield* walkFileTree(absPath, dirPage, parseContext);
        }
      }
    } else if (dirEntry.isFile()) {
      const page = await parseFile(absPath, parent, parseContext);
      if (page !== undefined) {
        yield page;
      }
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
  const { isPage, isSection, indexPath } = await getDirectoryParseInfo(
    dir,
    parent
  );

  if (!isPage && !isSection) {
    return undefined;
  }

  const page: Page = {
    content: "",
    date: null,
    description: null,
    dir: path.relative(parseContext.rootDirectory, dir),
    draft: false,
    file: null,
    isHome,
    isSection,
    image: null,
    kind: isHome ? "home" : isSection ? "section" : "page",
    parentSlug: parent?.slug ?? null,
    slug: "",
    title: path.basename(dir),
  };

  if (indexPath !== undefined) {
    assignFileInfo(indexPath, page, parseContext);
  }

  page.slug = createPageSlug(page);

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
    content: "",
    date: null,
    description: null,
    dir: parent.dir,
    draft: false,
    file: null,
    isHome: false,
    isSection: false,
    image: null,
    kind: "page",
    parentSlug: parent.slug,
    slug: "",
    title: path.basename(filePath).replace(/\.mdx?$/i, ""),
  };

  assignFileInfo(filePath, page, parseContext);

  page.slug = createPageSlug(page);

  return page;
}

/**
 * Gets information about a directory based on the contents of the directory.
 * Determines if the directory represents a bundle or a leaf and finds the
 * index file.
 *
 * @param dir the directory to get info about
 * @param parent the parent page of the directory
 * @returns Information about the directory
 */
async function getDirectoryParseInfo(dir: string, parent: Page | undefined) {
  let isPage = false;
  // home is by default a section (parent === undefined)
  // directories in home are by default a section (parent.parent === undefined)
  let isSection = parent === undefined || parent.parentSlug === undefined;

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

/**
 * Gets the content and front matter from a file
 * @param file the file to get parse info from
 * @returns the file parse info
 */
function getFileParseInfo(file: string): FileParseInfo {
  const fileContents = fs.readFileSync(file, "utf8");
  const { data, content } = matter(fileContents);
  return {
    content,
    frontMatter: data as PageFrontmatter,
  };
}

/**
 * Assigns all the properties on the page which can only be set after parsing
 * the file.
 *
 * @param filePath Path to a file
 * @param page the page to assign the file info to
 */
function assignFileInfo(
  filePath: string,
  page: Page,
  parseContext: ParseContext
) {
  const { frontMatter, content } = getFileParseInfo(filePath);
  page.content = content;
  if (frontMatter.description !== undefined) {
    page.description = frontMatter.description;
  }
  if (frontMatter.date !== undefined) {
    page.date = new Date(Date.parse(frontMatter.date));
  }
  if (frontMatter.draft !== undefined) {
    page.draft = frontMatter.draft;
  }
  if (frontMatter.title !== undefined) {
    page.title = frontMatter.title;
  }
  if (frontMatter.image !== undefined) {
    page.image = frontMatter.image;
  }

  const relativeFilePath = path.relative(parseContext.rootDirectory, filePath);
  page.file = {
    path: relativeFilePath,
  };
}

/**
 * Creates a unique slug for the page
 * @param page the page to create a slug for
 * @returns unique slug identifying the page
 */
function createPageSlug(page: Page): string {
  const isIndex =
    page.file !== null &&
    (isPageIndex(page.file.path) || isSectionIndex(page.file.path));
  return `${path.join(
    ...(isIndex ? ["/", page.dir] : ["/", page.dir, page.title])
  )}`.toLowerCase();
}

/**
 * Determine if a file path represents a section index.
 * A section index is an _index.md or _index.mdx file.
 * Basically any index file which starts with an underscore
 * @param entry a file path
 * @returns boolean if the file is a section index
 */
function isSectionIndex(entry: string) {
  return entry.match(/_index\.mdx?$/i) !== null;
}

/**
 * Determine if a file path represents a page index.
 * A page index is an index.md or index.mdx file.
 * Basically any index file which does not start with an underscore
 * @param entry a file path
 * @returns boolean if the file is a page index
 */
function isPageIndex(entry: string) {
  return entry.match(/(?<!_)index\.mdx?$/i) !== null;
}

/**
 * A page file is any file which is not an index file.
 * page files allow for top level pages
 *
 * For example the section foo can have a page called page.md.
 *
 * /foo
 *   _index.md
 *   page.md
 *
 * @param entry a file path
 * @returns boolean if the file is a page file
 */
function isPageFile(entry: string) {
  return (
    !isPageIndex(entry) && !isSectionIndex(entry) && entry.match(/\.mdx?$/i)
  );
}
