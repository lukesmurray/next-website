import { Feed } from "feed";
import fs from "fs/promises";
import { publishDrafts } from "lib/constants/publishDrafts";
import { SlugStaticPathsQuery } from "../../prisma/graphql";

export async function generateRssFeed(data: SlugStaticPathsQuery | undefined) {
  if (data === undefined) {
    return;
  }

  const baseUrl = "https://lsmurray.com";
  const author = {
    name: "Luke Murray",
    email: "luke@lukesmurray.com",
    link: baseUrl,
  };

  const feed = new Feed({
    title: "Feed Title",
    description: "This is my personal feed!",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    // image: "http://example.com/image.png",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()}, Luke Murray`,
    updated: new Date(),
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  });

  data?.pages.forEach((page) => {
    const url = `${baseUrl}${page.slug}`;
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
      });
    }
  });

  await fs.mkdir("./public/rss", { recursive: true });
  await fs.writeFile("./public/rss/feed.xml", feed.rss2());
  await fs.writeFile("./public/rss/atom.xml", feed.atom1());
  await fs.writeFile("./public/rss/feed.json", feed.json1());
}
