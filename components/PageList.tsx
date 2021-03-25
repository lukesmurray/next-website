import { isDefined } from "lib/types/isDefined";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Maybe } from "prisma/graphql";
import React from "react";
import { captionStyles, h3Styles, linkStyles } from "styles/proseStyles";
import { spacing } from "styles/spacing";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { ClusterGrid } from "./every-layout/ClusterGrid";
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
        <ClusterGrid>
          <ul
            css={[
              css`
                & > li {
                  ${tw`p-3 rounded-md shadow hover:cursor-pointer focus-within:cursor-pointer hover:shadow-md`}
                }
              `,
            ]}
          >
            {sections.map((page) => (
              <li key={page.slug}>
                <SectionCard page={page} />
              </li>
            ))}
          </ul>
        </ClusterGrid>
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

const SectionCard: React.VFC<{
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
      onClick={() => {
        if (page.kind !== "page") {
          router.push(page.slug);
        }
      }}
    >
      <Link href={page.slug} passHref>
        <a css={[h3Styles, linkStyles]}>{formatPageTitle(page)}</a>
      </Link>
      {isDefined(page.description) && (
        <div css={captionStyles}>{page.description}</div>
      )}
    </div>
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

  return (
    <div>
      <Link href={page.slug} passHref>
        <a css={[h3Styles, linkStyles]}>{formatPageTitle(page)}</a>
      </Link>
      {isDefined(page.date) && (
        <div css={captionStyles}>{formatDate(page.date)}</div>
      )}
      {isDefined(page.description) && (
        <div css={captionStyles}>{page.description}</div>
      )}
    </div>
  );
};
