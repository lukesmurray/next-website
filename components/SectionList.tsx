import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";

export const SectionList: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;

  const sections = currentPage.pages.filter((p) => p.kind !== "page");
  const pages = currentPage.pages.filter((p) => p.kind === "page");

  if (pages.length === 0 && sections.length === 0) {
    return null;
  }

  return (
    <section css={tw`prose mx-auto`}>
      {sections.length > 0 && (
        <>
          <h2>Sections</h2>
          <ul>
            {sections.map((page) => (
              <li key={page.slug}>
                <Link href={page.slug}>
                  <a>{page.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {pages.length > 0 && (
        <div>
          <h2>Pages</h2>
          <ul>
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.slug}>
                  <a>{page.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
