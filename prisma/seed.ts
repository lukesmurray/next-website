/**
 * This file seeds the database with the current file tree contents.
 *
 * To seed the database run the following two commands.
 *
 * npx prisma db push --preview-feature
 * npx prisma db seed --preview-feature
 *
 * https://www.prisma.io/docs/reference/api-reference/command-reference#db-push--preview
 * https://www.prisma.io/docs/reference/api-reference/command-reference#db-seed-preview
 */
import { rootDirectoryPath } from "../lib/constants/rootDirectory";
import { parseAllPagesInDir } from "../lib/fileParser/fileTreeParser";
import { prisma } from "../lib/prisma/db";

async function seedPages() {
  for await (let page of parseAllPagesInDir(rootDirectoryPath)) {
    try {
      await prisma.page.upsert({
        where: { slug: page.slug },
        create: {
          content: page.content,
          dir: page.dir,
          isHome: page.isHome,
          isSection: page.isSection,
          kind: page.kind,
          slug: page.slug,
          title: page.title,
          date: page.date,
          description: page.description,
          draft: page.draft,
          file:
            page.file === null
              ? undefined
              : {
                  create: {
                    path: page.file.path,
                  },
                },
          parent:
            page.parentSlug === null
              ? undefined
              : {
                  connect: {
                    slug: page.parentSlug,
                  },
                },
        },
        update: {
          content: page.content,
          dir: page.dir,
          isHome: page.isHome,
          isSection: page.isSection,
          kind: page.kind,
          slug: page.slug,
          title: page.title,
          date: page.date,
          description: page.description,
          draft: page.draft,
          parent:
            page.parentSlug === null
              ? undefined
              : {
                  connect: {
                    slug: page.parentSlug,
                  },
                },
          file:
            page.file === null
              ? undefined
              : {
                  update: {
                    path: page.file.path,
                  },
                },
        },
      });
    } catch (e) {
      console.log("failed to push", page);
      throw e;
    }
  }
}

async function main() {
  await seedPages();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
