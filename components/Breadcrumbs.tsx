import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";

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
    <nav css={tw`text-gray-600 text-xl`}>
      <ul
        css={css`
          & li {
            display: inline;

            &:hover {
              text-decoration: underline;
            }
          }

          /* put slashes between the slugs */
          & li + li:before {
            content: "/";

            /* need inline-block to remove text-decoration */
            ${tw`px-1`}
            display: inline-block;

            &:hover {
              text-decoration: none;
            }
          }
        `}
      >
        {breadCrumbs.map((crumb, i) => {
          const crumbSlug = `/${breadCrumbs.slice(1, i + 1).join("/")}`;
          return (
            <li key={crumbSlug}>
              <Link href={crumbSlug}>
                <a>{crumb}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
