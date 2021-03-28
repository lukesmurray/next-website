import renderToString from "next-mdx-remote/render-to-string";
import path from "path";
import footnotes from "remark-footnotes";
import numberedFootnotes from "remark-numbered-footnotes";
import remarkPrism from "remark-prism";
import remarkWikilink from "remark-wiki-link";
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
        [
          remarkWikilink,
          {
            pageResolver: (permalink: string) => {
              return [
                path
                  .resolve(path.join(slug, permalink))
                  .replace(/\.mdx?$/i, "")
                  .replace(/\/_?index$/i, ""),
              ];
            },
            hrefTemplate: (permalink: string) => {
              return `${permalink}`;
            },
            aliasDivider: "|",
          },
        ],
      ],
      rehypePlugins: [[imageMetadata as any, { slug } as any]],
    },
  });
}
