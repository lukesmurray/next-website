declare module "hast-util-classnames" {
  import { Element } from "hast";
  type Conditional = string | number | Record<string, boolean> | Conditional[];
  const classNames: (node: Element, ...conditionals: Conditional[]) => Element;
  export default classNames;
}
