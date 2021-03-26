import renderToString from "next-mdx-remote/render-to-string";
import footnotes from "remark-footnotes";
import numberedFootnotes from "remark-numbered-footnotes";
import remarkPrism from "remark-prism";
import { mdxComponents } from "./mdxComponents";
import { imageMetadata } from "./plugins/imageMetadata";

export function renderMdxDataToString(content: string, slug: string) {
  return renderToString(content, {
    components: mdxComponents(slug),
    mdxOptions: {
      remarkPlugins: [
        [
          footnotes,
          {
            inlineNotes: true,
          },
        ],
        [numberedFootnotes],
        [remarkPrism],
      ],
      rehypePlugins: [[imageMetadata as any, { slug } as any]],
    },
  });
}
