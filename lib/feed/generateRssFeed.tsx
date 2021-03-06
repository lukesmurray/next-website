import { Feed } from "feed";
import fs from "fs/promises";
import { publishDrafts } from "lib/constants/publishDrafts";
import { renderMdxDataToStaticHtml } from "lib/mdx/renderMdxDataToString";
import { slugQueryStaticProps } from "lib/queries/slugQueryStaticProps";
import { convertDatabaseSlugToRenderSlug } from "lib/utils/routing";
import { SlugStaticPathsQuery } from "../../prisma/graphql";
import {
  author,
  feedBaseUrl,
  feedDescription,
  feedSlugs,
  feedTitle,
} from "./feedConstants";

export async function generateRssFeed(data: SlugStaticPathsQuery | undefined) {
  if (data === undefined) {
    return;
  }

  const feed = new Feed({
    title: feedTitle,
    description: feedDescription,
    id: feedBaseUrl,
    link: feedBaseUrl,
    language: "en",
    // image: "http://example.com/image.png",
    favicon: `${feedBaseUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()}, Luke Murray`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${feedBaseUrl}${feedSlugs.rss}`,
      json: `${feedBaseUrl}${feedSlugs.json}`,
      atom: `${feedBaseUrl}${feedSlugs.atom}`,
    },
    author: author,
  });

  for (const page of data.pages) {
    const url = `${feedBaseUrl}${page.slug}`;
    const pageQueryResult = await slugQueryStaticProps(
      convertDatabaseSlugToRenderSlug(page.slug)
    );
    // add pages to the feed
    // don't add drafts unless publish drafts is truee
    if (page.kind === "page" && (page.draft !== true || publishDrafts)) {
      feed.addItem({
        title: page.title,
        id: url,
        link: url,
        description: page.description ?? undefined,
        author: [author],
        contributor: [author],
        date: new Date(page.date),
        content: await renderMdxDataToStaticHtml(
          page.content,
          page.slug,
          pageQueryResult.data as any
        ),
      });
    }
  }

  await fs.mkdir(`./public${feedSlugs.directory}`, { recursive: true });
  await fs.writeFile(`./public${feedSlugs.rss}`, feed.rss2());
  await fs.writeFile(`./public${feedSlugs.atom}`, feed.atom1());
  await fs.writeFile(`./public${feedSlugs.json}`, feed.json1());
}
