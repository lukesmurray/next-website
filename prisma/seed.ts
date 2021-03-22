import { PrismaClient } from "@prisma/client";
import path from "path";
import { parseAllPagesInDir } from "../lib/fileTree";

const prisma = new PrismaClient();

async function seedPages() {
  const rootDirectory = path.join(process.cwd(), "content");
  for await (let page of parseAllPagesInDir(rootDirectory)) {
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
      console.log("pushed page", page);
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
