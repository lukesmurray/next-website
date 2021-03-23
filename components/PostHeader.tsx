import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { isDefined } from "../lib/types/isDefined";
import { getStaticProps } from "../pages/[[...slug]]";
import { formatDate } from "./formatters/formatDate";
import { formatPageTitle } from "./formatters/formatPageTitle";

export const PostHeader: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  if (currentPage.kind !== "page") {
    return null;
  }
  return (
    <div css={tw` max-w-prose mx-auto pt-12 pb-10`}>
      <h1>
        <Link href={currentPage.slug}>
          <a>
            <span css={tw`text-3xl font-semibold hover:underline`}>
              {formatPageTitle(currentPage)}
            </span>
          </a>
        </Link>
      </h1>
      <div css={tw`text-gray-600 flex gap-6 flex-wrap`}>
        {isDefined(currentPage.date) && (
          <span>{formatDate(currentPage.date)}</span>
        )}
      </div>
    </div>
  );
};
