import renderToString from "next-mdx-remote/render-to-string";
import path from "path";
import ReactDOMServer from "react-dom/server";
import footnotes from "remark-footnotes";
import numberedFootnotes from "remark-numbered-footnotes";
import remarkPrism from "remark-prism";
import remarkWikilink from "remark-wiki-link";
import { Pluggable } from "unified";
import { hydrateMdxData } from "./hydrateMdxData";
import { mdxComponents } from "./mdxComponents";
import { anchorMetadata } from "./plugins/anchorMetadata";
import { imageMetadata } from "./plugins/imageMetadata";

export function renderMdxDataToString(content: string, slug: string) {
  return renderToString(content, {
    components: mdxComponents(slug),
    mdxOptions: {
      remarkPlugins: getRemarkPlugins(slug),
      rehypePlugins: getRehypePlugins(slug),
    },
  });
}

export async function renderMdxDataToStaticHtml(content: string, slug: string) {
  const mdx = await renderMdxDataToString(content, slug);
  return ReactDOMServer.renderToStaticMarkup(<>{hydrateMdxData(mdx, slug)}</>);
}

function getRehypePlugins(slug: string): Pluggable[] {
  return [[imageMetadata as any, { slug } as any], [anchorMetadata as any]];
}

function getRemarkPlugins(slug: string): Pluggable[] {
  return [
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
          console.log(slug, path.join(slug, permalink));
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
        newClassName: " ",
        wikiLinkClassName: " ",
      },
    ],
  ];
}
