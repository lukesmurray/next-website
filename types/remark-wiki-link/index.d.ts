declare module "remark-wiki-link" {
  import { Plugin } from "unified";
  type RemarkWikilink = Plugin;
  const remarkWikilink: RemarkWikilink;
  export default remarkWikilink;
}
