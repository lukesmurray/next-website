/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import { Layout } from "components/Layout";
import { PageList } from "components/PageList";
import { PostBody } from "components/PostBody";
import { PostHeader } from "components/PostHeader";
import { SEO } from "components/SEO";
import { generateRssFeed } from "lib/feed/generateRssFeed";
import { addMdxToData } from "lib/mdx/addMdxToData";
import { slugQueryStaticPaths } from "lib/queries/slugQueryStaticPaths";
import { slugQueryStaticProps as slugQueryStaticProps } from "lib/queries/slugQueryStaticProps";
import {
  convertArraySlugToRenderSlug,
  convertDatabaseSlugToArraySlug,
} from "lib/utils/routing";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { root, currentPage } = props;
  if (root === undefined || currentPage === undefined) {
    throw new Error("expected all pages to be defined");
  }

  return (
    <Layout {...props}>
      <SEO {...props} />
      <PostHeader {...props} />
      <PostBody {...props} />
      <PageList {...props} />
    </Layout>
  );
}

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  // the slug to render (if empty then default to home page "/")
  const slug = convertArraySlugToRenderSlug(
    context?.params?.slug as string[] | undefined
  );

  let result = await slugQueryStaticProps(slug);

  // modify the data by adding mdx to it
  let modifiedData = await addMdxToData(result.data!);

  type NonNullableProperties<T> = {
    [K in keyof T]-?: NonNullable<T[K]>;
  };

  const nonNullableModifiedData = modifiedData as NonNullableProperties<
    typeof modifiedData
  >;

  return {
    props: nonNullableModifiedData,
  };
};

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async (context: GetStaticPathsContext) => {
  const result = await slugQueryStaticPaths();

  if (process.env.NODE_ENV !== "development") {
    await generateRssFeed(result.data);
  }

  return {
    paths: result.data!.pages.map((page) => ({
      params: {
        slug: convertDatabaseSlugToArraySlug(page.slug),
      },
    })),
    fallback: false,
  };
};
