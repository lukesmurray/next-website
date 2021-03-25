import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { captionStyles, linkStyles } from "styles/proseStyles";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Cluster } from "./every-layout/Cluster";

/**
 * Filepath-like breadcrumbs for the site
 */
export const Breadcrumbs: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const HomeCrumb = "~";
  const breadCrumbs = [
    HomeCrumb,
    ...props.currentPage.slug.split("/").filter((v) => v),
  ];
  return (
    <Cluster as="nav" space="0" aria-label="breadcrumb" role="navigation">
      <ol
        css={css`
          /* put slashes between the slugs */
          & li + li:before {
            content: "/";

            /* put padding around slashes */
            ${tw`px-1`}

            ${captionStyles}
          }
        `}
      >
        {breadCrumbs.map((crumb, i) => {
          const crumbSlug = `/${breadCrumbs.slice(1, i + 1).join("/")}`;
          return (
            <li key={crumbSlug}>
              <Link href={crumbSlug} passHref>
                {/* TODO(lukemurray): would be nice to have an aria-label here with the link title */}
                <a css={[linkStyles, captionStyles]}>{crumb}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </Cluster>
  );
};
