import path from "path";
import { createFileTree } from "./fileTree";

// this is the root directory
const rootDirectory = path.join(process.cwd(), "content");

// TODO create a content tree of pages
// a page can be home, section, or page
// base it off of https://gohugo.io/variables/page/ and https://gohugo.io/content-management/sections/

export async function getAllContent() {
  const { root, pageDict } = await createFileTree(rootDirectory);
  return { root, pageDict };
}
