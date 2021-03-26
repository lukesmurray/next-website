declare module "remark-prism" {
  import { Plugin } from "unified";
  type RemarkPrism = Plugin;
  const remarkPrism: RemarkPrism;
  export default remarkPrism;
}
