import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { h2Styles, linkStyles } from "styles/proseStyles";
import { getStaticProps } from "../pages/[[...slug]]";

export const Logo: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { root } = props;
  return (
    <h2>
      <Link href={"/"} passHref>
        <a css={[h2Styles, linkStyles]}>{root.title}</a>
      </Link>
    </h2>
  );
};
