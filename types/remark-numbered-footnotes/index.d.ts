declare module "remark-numbered-footnotes" {
  import { Plugin } from "unified";
  type NumberedFootnotes = Plugin;
  const remarkNumberedFootnotes: NumberedFootnotes;
  export default remarkNumberedFootnotes;
}
