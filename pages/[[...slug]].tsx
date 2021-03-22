/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import { gql } from "@apollo/client";
import { Interpolation, Theme } from "@emotion/react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import Link from "next/link";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import tw from "twin.macro";
import { client } from "../lib/graphql/client";
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

  const content = hydrate(currentPage.mdx, {
    components: mdxComponents(currentPage.slug),
  });

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

  let result = await client.query<SlugPageQuery, SlugPageQueryVariables>({
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
          content
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

  // modify the data by adding mdx to it
  let modifiedData = await addMdxToData(result.data);

  return {
    props: modifiedData,
  };
};

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async (
  context: any /*GetStaticPathsContext*/
) => {
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

/**
 * Function to add mdx to a result
 * @returns
 */
async function addMdxToData(data: SlugPageQuery) {
  // create a copy of the data object
  data = JSON.parse(JSON.stringify(data));

  // create the mdx
  const mdx = await renderToString(data.currentPage!.content, {
    components: mdxComponents(data.currentPage!.slug),
  });

  // add the mdx to the current page
  data.currentPage = Object.assign(data.currentPage, {
    mdx: mdx,
  });

  // type helper for modifying a type by overriding keys
  type Modify<T, R> = Omit<T, keyof R> & R;

  // create the modified result type
  // modifies data.currentPage by adding mdx
  type ModifiedDataType = Modify<
    typeof data,
    {
      currentPage: Modify<
        typeof data.currentPage,
        {
          mdx: MdxRemote.Source;
        }
      >;
    }
  >;

  return Object.freeze(data) as ModifiedDataType;
}

function mdxComponents(slug: string): MdxRemote.Components {
  const components: MdxRemote.Components = {
    img: (
      props: React.ClassAttributes<HTMLImageElement> &
        React.ImgHTMLAttributes<HTMLImageElement> & {
          css?: Interpolation<Theme>;
        }
    ) => {
      const { src, ...otherProps } = props;
      return (
        <img
          {...otherProps}
          // src={require(`../content${slug}/${props.src}`).default}
        />
      );
    },
  };
  return components;
}
