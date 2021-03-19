/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import { getAllContent } from "../lib/api";

export default function Page({
  root,
  page,
  pageDict,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // const router = useRouter();
  // const { slug } = router.query;
  return (
    <div>
      <div>{page.title}</div>
      <div>
        Sections
        <nav>
          {[root.slug, ...root.sections].map((sectionSlug) => {
            const sectionPage = pageDict[sectionSlug];
            return (
              <Link href={sectionSlug} key={sectionSlug}>
                <a>{sectionPage.title}</a>
              </Link>
            );
          })}
        </nav>
      </div>

      <div>{page.content}</div>
      <div>
        {page.pages.map((subPageSlug) => {
          const subPage = pageDict[subPageSlug];
          return (
            <Link href={subPageSlug} key={subPageSlug}>
              <a>{subPage.title}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  // the slug to render
  const slug = `/${((context.params.slug ?? []) as string[]).join("/")}`;
  // get the content
  const { root, pageDict } = await getAllContent();
  // the page to render
  const page = pageDict[slug];

  return {
    props: { root, pageDict, page },
  };
};

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async (context: GetStaticPathsContext) => {
  const { pageDict } = await getAllContent();
  // the paths are just the keys of the content pages
  const paths = Object.keys(pageDict).map((k) => ({
    params: { slug: k.split("/").filter((v) => v) },
  }));
  return {
    paths,
    fallback: false,
  };
};
