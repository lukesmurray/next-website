import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { h4Styles, linkStyles } from "styles/proseStyles";
import { getStaticProps } from "../pages/[[...slug]]";
import { Cluster } from "./every-layout/Cluster";
import { formatPageTitle } from "./formatters/formatPageTitle";

/**
 * Top level navigation links for the site
 */
export const HeaderSectionLinks: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <Cluster as="nav" role="navigation" aria-label="main">
      <ul>
        {props.root.pages
          .filter((p) => p.kind !== "page")
          .map((page) => (
            <li key={page.slug}>
              <Link href={page.slug} passHref>
                <a css={[h4Styles, linkStyles]}>{formatPageTitle(page)}</a>
              </Link>
            </li>
          ))}
      </ul>
    </Cluster>
  );
};
