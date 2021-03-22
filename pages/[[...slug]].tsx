/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import tw from "twin.macro";
import { queryGraphql } from "../lib/graphql/queryGraphql";
import { addMdxToData } from "../lib/mdx/addMdxToData";
import { hydrateMdxData } from "../lib/mdx/hydrateMdxData";
import {
  SlugPageQuery,
  SlugPageQueryVariables,
  SlugStaticPathsQuery,
  SlugStaticPathsQueryVariables,
} from "../prisma/graphql";

export default function Page({
  root,
  currentPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (root === undefined || currentPage === undefined) {
    throw new Error("expected all pages to be defined");
  }

  const content = hydrateMdxData(currentPage.mdx, currentPage.slug);

  return (
    <>
      <header>
        <Link href={root.slug}>
          <a>{root.title}</a>
        </Link>
      </header>
      <main>
        <h1>{currentPage.title}</h1>
        <article css={[tw`prose mx-auto`]}>{content}</article>
        <section>
          <h2>Pages</h2>
          <ul>
            {currentPage.pages.map((p) => (
              <li key={p.slug}>
                <Link href={p.slug}>
                  <a>{p.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
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
        }
        currentPage: page(where: { slug: $currentSlug }) {
          slug
          title
          content
          pages {
            slug
            title
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

  return {
    props: modifiedData,
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
