import { isDefined } from "lib/types/isDefined";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Maybe } from "prisma/graphql";
import React from "react";
import tw, { css, styled } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { formatDate } from "./formatters/formatDate";
import { formatPageTitle } from "./formatters/formatPageTitle";

export const PageList: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;

  const sections = currentPage.pages.filter((p) => p.kind !== "page");
  const pages = currentPage.pages.filter((p) => p.kind === "page");

  if (pages.length === 0 && sections.length === 0) {
    return null;
  }

  return (
    <PageListWrapper
      css={[
        tw`mx-auto max-w-prose`,
        css`
          ${SectionsWrapper} + ${PagesWrapper} {
            ${tw`pt-16`}
          }
        `,
      ]}
    >
      {sections.length > 0 && (
        <SectionsWrapper
          css={[
            tw`flex flex-row gap-3 flex-wrap`,
            css`
              & > li {
                ${tw`p-3 shadow rounded-md hover:shadow-lg`}
              }
            `,
          ]}
        >
          {sections.map((page) => (
            <li key={page.slug}>
              <PageSummaryLink page={page} />
            </li>
          ))}
        </SectionsWrapper>
      )}
      {pages.length > 0 && (
        <PagesWrapper css={tw`flex flex-col gap-14`}>
          {pages.map((page) => (
            <li key={page.slug}>
              <PageSummaryLink page={page} />
            </li>
          ))}
        </PagesWrapper>
      )}
    </PageListWrapper>
  );
};

const SectionsWrapper = styled.ul();
const PagesWrapper = styled.ul();

export const PageListWrapper = styled.section();

const PageSummaryLink: React.VFC<{
  page: {
    slug: string;
    title: string;
    kind: string;
    draft: boolean;
    date?: any;
    description?: Maybe<string> | undefined;
  };
}> = (props) => {
  const { page } = props;
  const router = useRouter();

  return (
    <div
      css={page.kind !== "page" && tw`cursor-pointer`}
      onClick={() => {
        if (page.kind !== "page") {
          router.push(page.slug);
        }
      }}
    >
      <Link href={page.slug}>
        <a>
          <span css={tw`text-lg hover:underline font-semibold`}>
            {formatPageTitle(page)}
          </span>
        </a>
      </Link>
      {isDefined(page.date) && page.kind === "page" && (
        <div css={tw`text-sm`}>{formatDate(page.date)}</div>
      )}
      {isDefined(page.description) && (
        <div css={tw`text-gray-600`}>{page.description}</div>
      )}
    </div>
  );
};
