import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Breadcrumbs } from "./Breadcrumbs";
import { TopLinks } from "./TopLinks";

export const Header: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { root } = props;
  return (
    <header>
      <TopLinks {...props} />
      <Link href={"/"}>
        <a>
          <h2 css={tw`text-5xl font-semibold block`}>{root.title}</h2>
        </a>
      </Link>
      <Breadcrumbs {...props} />
    </header>
  );
};
