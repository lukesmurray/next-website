/**
 * https://nextjs.org/docs/routing/dynamic-routes
 */
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "node:querystring";
import React from "react";
import tw from "twin.macro";

export default function Page({
  root,
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div css={[tw`bg-green-100`]}>Hello world</div>;
}

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  // the slug to render
  const slug = `/${((context.params?.slug ?? []) as string[]).join("/")}`;
  // the root
  const root = {};
  // the page to render
  const page = {};

  return {
    props: { root, page },
  };
};

// see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export const getStaticPaths = async (context: GetStaticPathsContext) => {
  const pageDict = { "": {} };
  // the paths are just the keys of the content pages
  const paths = Object.keys(pageDict).map((k) => ({
    params: { slug: k.split("/").filter((v) => v) },
  }));
  return {
    paths,
    fallback: false,
  };
};
