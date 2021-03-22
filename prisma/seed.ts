import { PrismaClient } from "@prisma/client";
import path from "path";
import { loadAllPagesInDir } from "../lib/fileTree";

const prisma = new PrismaClient();

async function seedPages() {
  const rootDirectory = path.join(process.cwd(), "content");
  for await (let page of loadAllPagesInDir(rootDirectory)) {
    const {
      // sectionSlug,
      parentSlug,
      firstSectionSlug,
      ...pageWithoutRelationships
    } = page;
    const newPageInput = {
      ...pageWithoutRelationships,
      // section: {
      //   connect: {
      //     slug: page.sectionSlug,
      //   },
      // },
      ...(page.parentSlug !== null
        ? {
            parent: {
              connect: {
                slug: page.parentSlug,
              },
            },
          }
        : {}),
      ...(page.firstSectionSlug !== null
        ? {
            firstSection: {
              connect: {
                slug: page.firstSectionSlug,
              },
            },
          }
        : {}),
    };
    await prisma.page.upsert({
      where: { slug: page.slug },
      create: { ...newPageInput },
      update: {
        ...newPageInput,
        file: undefined,
      },
    });
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
