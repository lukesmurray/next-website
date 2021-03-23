import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Breadcrumbs } from "./Breadcrumbs";
import { HeaderSectionLinks } from "./HeaderSectionLinks";

export const Header: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { root } = props;
  return (
    <header>
      <HeaderSectionLinks {...props} />
      <h2>
        <Link href={"/"}>
          <a>
            <span css={tw`text-5xl font-semibold hover:underline`}>
              {root.title}
            </span>
          </a>
        </Link>
      </h2>
      <Breadcrumbs {...props} />
    </header>
  );
};
