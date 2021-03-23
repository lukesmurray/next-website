import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { formatPageTitle } from "./formatters/formatPageTitle";

/**
 * Top level navigation links for the site
 */
export const HeaderSectionLinks: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <nav>
      <ul css={tw`flex flex-row justify-end gap-5 text-2xl font-semibold`}>
        {props.root.pages
          .filter((p) => p.kind !== "page")
          .map((page) => (
            <li key={page.slug}>
              <Link href={page.slug}>
                <a>
                  <span css={tw`hover:underline`}>{formatPageTitle(page)}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};
