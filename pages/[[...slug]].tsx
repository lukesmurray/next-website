/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import { Layout } from "../components/Layout";
import { PageContent } from "../components/PageContent";
import { PageTitle } from "../components/PageTitle";
import { SectionList } from "../components/SectionList";
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
        <PageTitle {...props} />
        <PageContent {...props} />
        <SectionList {...props} />
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
    /* GraphQL */ `
      query SlugPage($currentSlug: String!) {
        root: page(where: { slug: "/" }) {
          slug
          title
          pages {
            slug
            title
            kind
          }
        }
        currentPage: page(where: { slug: $currentSlug }) {
          slug
          title
          kind
          content
          date
          parent {
            slug
            title
            kind
            pages {
              slug
              title
              kind
            }
          }
          pages {
            slug
            title
            kind
          }
        }
      }
    `,
    {
      currentSlug: slug,
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
  >(/* GraphQL */ `
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
