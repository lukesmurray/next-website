import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";

export const Logo: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { root } = props;
  return (
    <h2>
      <Link href={"/"}>
        <a>
          <span css={tw`text-5xl font-semibold hover:underline`}>
            {root.title}
          </span>
        </a>
      </Link>
    </h2>
  );
};
