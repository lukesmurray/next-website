import renderToString from "next-mdx-remote/render-to-string";
import { mdxComponents } from "./mdxComponents";

export function renderMdxDataToString(content: string, slug: string) {
  return renderToString(content, {
    components: mdxComponents(slug),
  });
}
