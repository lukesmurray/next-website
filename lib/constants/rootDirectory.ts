import path from "path";

/**
 * the root directory for the markdown files
 */
export const rootDirectory = "content";

/**
 * The root directory for all the content
 */
export const rootDirectoryPath = path.join(process.cwd(), rootDirectory);
