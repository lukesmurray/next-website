/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import { Layout } from "../components/Layout";
import { PageList } from "../components/PageList";
import { PostBody } from "../components/PostBody";
import { PostHeader } from "../components/PostHeader";
import { publishDrafts } from "../lib/constants/publishDrafts";
import { gql } from "../lib/graphql/gql";
import { queryGraphql } from "../lib/graphql/queryGraphql";
import { addMdxToData } from "../lib/mdx/addMdxToData";
import {
  SlugPageQuery,
  SlugPageQueryVariables,
  SlugStaticPathsQuery,
  SlugStaticPathsQueryVariables,
} from "../prisma/graphql";

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { root, currentPage } = props;
  if (root === undefined || currentPage === undefined) {
    throw new Error("expected all pages to be defined");
  }

  return (
    <>
      {/* TODO(lukemurray): we need to exract these into components */}
      <Layout {...props}>
        <PostHeader {...props} />
        <PostBody {...props} />
        <PageList {...props} />
      </Layout>
    </>
  );
}

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  // the slug to render (if empty then default to home page "/")
  const slug = `/${((context.params?.slug ?? []) as string[]).join("/")}`;

  let result = await queryGraphql<SlugPageQuery, SlugPageQueryVariables>(
    gql`
      query SlugPage($currentSlug: String!, $publishDrafts: Boolean!) {
        root: page(where: { slug: "/" }) {
          slug
          title
          pages(
            orderBy: { date: desc }
            where: {
              OR: [
                { draft: { not: { equals: true } } }
                { draft: { equals: $publishDrafts } }
              ]
            }
          ) {
            slug
            title
            kind
            draft
          }
        }
        currentPage: page(where: { slug: $currentSlug }) {
          slug
          title
          kind
          content
          date
          draft
          filePath
          parent {
            slug
            title
            kind
            draft
            pages(
              orderBy: { date: desc }
              where: {
                OR: [
                  { draft: { not: { equals: true } } }
                  { draft: { equals: $publishDrafts } }
                ]
              }
            ) {
              slug
              title
              kind
              draft
            }
          }
          pages(
            orderBy: { date: desc }
            where: {
              OR: [
                { draft: { not: { equals: true } } }
                { draft: { equals: $publishDrafts } }
              ]
            }
          ) {
            slug
            title
            kind
            draft
          }
        }
      }
    `,
    {
      currentSlug: slug,
      publishDrafts,
    }
  );

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
export const getStaticPaths = async (
  context: any /*GetStaticPathsContext*/
) => {
  const result = await queryGraphql<
    SlugStaticPathsQuery,
    SlugStaticPathsQueryVariables
  >(gql`
    query SlugStaticPaths {
      pages {
        slug
      }
    }
  `);
  return {
    paths: result.data!.pages.map((s) => ({
      params: {
        slug: s.slug.split("/").filter((v) => v),
      },
    })),
    fallback: false,
  };
};
