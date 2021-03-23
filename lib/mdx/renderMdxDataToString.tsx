import renderToString from "next-mdx-remote/render-to-string";
import footnotes from "remark-footnotes";
import numberedFootnotes from "remark-numbered-footnotes";
import { mdxComponents } from "./mdxComponents";

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
      ],
    },
  });
}
