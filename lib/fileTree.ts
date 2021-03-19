import path from "path";

interface File {
  /**
   * the path to the file relative to the content directory
   */
  path: string;
}

interface PageFrontmatter {
  date: string;
  description: string;
  draft: boolean;
}

interface Page {
  /**
   * Content defined below frontmatter
   */
  content?: string;

  /**
   * date field from frontmatter
   */
  date?: string;

  /**
   * Description of the page
   * from description field of frontmatter
   */
  description?: string;

  /**
   * Path to the directory containing this content file.
   * Path is relative to the content folder.
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
  file: File;

  /**
   * true if this is the home page
   */
  isHome: boolean;

  /**
   * True if kind is section
   */
  isSection: boolean;

  /**
   * The kind of the page
   */
  kind: "home" | "page" | "section";

  /**
   * the next page in the entire tree
   */
  next: Page | undefined;

  /**
   * the next page in the current section
   */
  nextInSection: Page | undefined;

  /**
   * the prev page in the entire tree
   */
  prev: Page | undefined;

  /**
   * the prev page in the current section
   */
  prevInSection: Page | undefined;

  /**
   * the title for this page
   * from title in frontmatter
   */
  title: string;

  /**
   * The section for the page (can be the page itself if the page is a section)
   */
  section: Page;

  /**
   * The parent section for the page
   */
  parent: Page | undefined;

  /**
   * The sections below this page
   */
  sections: Page[];

  /**
   * The regular pages below this page (does not include sections)
   */
  regularPages: Page[];

  /**
   * The pages below this page (includes sections)
   */
  pages: Page[];
}

// this is the root directory
const rootDirectory = path.join(process.cwd(), "content");

export async function createFileTree() {}
