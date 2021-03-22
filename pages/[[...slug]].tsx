/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import { gql } from "@apollo/client";
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import tw from "twin.macro";
import { client } from "../lib/client";
import {
  SlugPageQuery,
  SlugPageQueryVariables,
  SlugStaticPathsQuery,
  SlugStaticPathsQueryVariables,
} from "../lib/graphql";

export default function Page({
  root,
  currentPage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (root === undefined || currentPage === undefined) {
    throw new Error("expected all pages to be defined");
  }

  return (
    <>
      <header>
        <Link href={root.slug}>
          <a>{root.title}</a>
        </Link>
      </header>
      <main>
        <h1>{currentPage.title}</h1>
        <article
          css={[tw`prose mx-auto`]}
          dangerouslySetInnerHTML={{ __html: currentPage.html }}
        ></article>
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

  const result = await client.query<SlugPageQuery, SlugPageQueryVariables>({
    query: gql`
      #graphql
      query SlugPage($currentSlug: String!) {
        root: page(where: { slug: "/" }) {
          slug
          title
        }
        currentPage: page(where: { slug: $currentSlug }) {
          slug
          title
          html
          pages {
            slug
            title
          }
        }
      }
    `,
    variables: {
      currentSlug: slug,
    },
  });
  console.log(result);

  return {
    props: result.data,
  };
};

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async (context: GetStaticPathsContext) => {
  const result = await client.query<
    SlugStaticPathsQuery,
    SlugStaticPathsQueryVariables
  >({
    query: gql`
      query SlugStaticPaths {
        pages {
          slug
        }
      }
    `,
  });
  return {
    paths: result.data.pages.map((s) => ({
      params: {
        slug: s.slug.split("/").filter((v) => v),
      },
    })),
    fallback: false,
  };
};
