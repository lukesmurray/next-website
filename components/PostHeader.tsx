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
  if (currentPage.kind === "home") {
    return null;
  }
  return (
    <header>
      {/* render the title as an h1 */}
      <h1>
        <Link href={currentPage.slug}>
          <a>
            <span css={tw`text-5xl font-semibold hover:underline`}>
              {formatPageTitle(currentPage)}
            </span>
          </a>
        </Link>
      </h1>
      {/* page only details, keep's sections cleaner */}
      {currentPage.kind === "page" && (
        <div css={tw`text-gray-600 flex gap-6 flex-wrap`}>
          {isDefined(currentPage.date) && (
            <span>{formatDate(currentPage.date)}</span>
          )}
        </div>
      )}
    </header>
  );
};
