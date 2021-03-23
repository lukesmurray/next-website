declare module "remark-numbered-footnotes" {
  import { Plugin } from "unified";
  type NumberedFootnotes = Plugin;
  declare const remarkNumberedFootnotes: NumberedFootnotes;
  export default remarkNumberedFootnotes;
}
