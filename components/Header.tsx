import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Breadcrumbs } from "./Breadcrumbs";

export const Header: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { root } = props;
  return (
    <header>
      <Link href={root.slug}>
        <a css={tw`text-5xl font-semibold block`}>{root.title}</a>
      </Link>
      <Breadcrumbs {...props} />
    </header>
  );
};
