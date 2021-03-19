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
import tw from "twin.macro";
import { getAllContent } from "../lib/api";

export default function Page({
  root,
  page,
  pageDict,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div css={[tw`bg-green-100`]}>
      <h2 css={[tw`text-7xl font-semibold`]}>{root.title}</h2>
      <nav css={[tw`flex flex-row flex-wrap gap-3`]}>
        {[root.slug, ...root.sections].map((sectionSlug) => {
          const sectionPage = pageDict[sectionSlug];
          return (
            <Link href={sectionSlug} key={sectionSlug}>
              <a css={[tw`text-2xl`]}>{sectionPage.title}</a>
            </Link>
          );
        })}
      </nav>
      <h1 css={[tw`text-4xl font-semibold`]}>{page.title}</h1>
      <main css={[tw`prose prose-xl`]}>{page.content}</main>
      <div>
        <h2 css={[tw`text-2xl`]}>Sections</h2>
        <nav css={[tw`flex flex-col gap-3`]}>
          {page.pages.map((subPageSlug) => {
            const subPage = pageDict[subPageSlug];
            return (
              <Link href={subPageSlug} key={subPageSlug}>
                <a css={[tw`text-xl`]}>{subPage.title}</a>
              </Link>
            );
          })}
        </nav>
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
