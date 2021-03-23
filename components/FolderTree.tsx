import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { VscFile, VscFolder, VscFolderOpened } from "react-icons/vsc";
import tw, { css, styled } from "twin.macro";
import { isDefined } from "../lib/types/isDefined";
import { getStaticProps } from "../pages/[[...slug]]";
import { formatPageTitle } from "./formatters/formatPageTitle";

export const Folders: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <nav
      css={css`
        & li {
          ${tw`pl-3`}
        }
      `}
    >
      <ParentPageList {...props} />
    </nav>
  );
};

/**
 * Folder list starting from the parent page
 */
const ParentPageList: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  const parent = currentPage.parent;

  return isDefined(parent) ? (
    <ul>
      <PageListItem page={parent} open={true}>
        <ul>
          {/* create a list item for each of the parent pages */}
          {parent.pages.map((page) => {
            const isCurrentPage = page.slug === currentPage.slug;
            if (isCurrentPage) {
              return <CurrentPageList {...props} key={page.slug} />;
            } else {
              return <PageListItem page={page} key={page.slug} open={false} />;
            }
          })}
        </ul>
      </PageListItem>
    </ul>
  ) : (
    <ul>
      <CurrentPageList {...props} />
    </ul>
  );
};

/**
 * Folder list starting from the current page
 */
const CurrentPageList: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => (
  <PageListItem page={props.currentPage} open={true}>
    <ul>
      {props.currentPage.pages.map((page) => {
        return <PageListItem page={page} key={page.slug} open={false} />;
      })}
    </ul>
  </PageListItem>
);

/**
 * React component representing a page list item
 */
const PageListItem: React.FC<{
  page: { slug: string; title: string; kind: string; draft: boolean };
  open: boolean;
}> = (props) => {
  const { page } = props;
  return (
    <li key={page.slug}>
      {page.kind === "page" ? (
        <FileIcon />
      ) : props.open ? (
        <OpenFolderIcon />
      ) : (
        <FolderIcon />
      )}
      <Link href={page.slug}>
        <a>{formatPageTitle(page)}</a>
      </Link>
      {props.children}
    </li>
  );
};

const FolderIcon = styled(VscFolder)`
  display: inline;
  ${tw`mr-2`}
`;
const OpenFolderIcon = FolderIcon.withComponent(VscFolderOpened);
const FileIcon = FolderIcon.withComponent(VscFile);
