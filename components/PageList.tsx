import { isDefined } from "lib/types/isDefined";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Maybe } from "prisma/graphql";
import React from "react";
import { spacing } from "styles/spacing";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Cluster } from "./every-layout/Cluster";
import { Stack } from "./every-layout/Stack";
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
    <Stack as={"section"} space={spacing[14]}>
      {sections.length > 0 && (
        <Cluster>
          <ul
            css={[
              css`
                & > li {
                  ${tw`p-3 rounded-md border-gray-100 border-solid border-2`}
                }
              `,
            ]}
          >
            {sections.map((page) => (
              <li key={page.slug}>
                <PageSummaryLink page={page} />
              </li>
            ))}
          </ul>
        </Cluster>
      )}
      {pages.length > 0 && (
        <Stack as="ul">
          {pages.map((page) => (
            <li key={page.slug}>
              <PageSummaryLink page={page} />
            </li>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

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
