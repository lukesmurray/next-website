import { css } from "@emotion/react";
import { InferGetStaticPropsType } from "next";
import React from "react";
import { proseStyles } from "styles/proseStyles";
import { styled } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { MDX } from "./MDX";

export const PostBody: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  // if the raw text content is empty don't render anything
  const { currentPage } = props;
  if (currentPage.content.length === 0) {
    return null;
  }

  return (
    <PostBodyWrapper {...props}>
      <MDX mdx={currentPage.mdx} slug={currentPage.slug} />
    </PostBodyWrapper>
  );
};

export const PostBodyWrapper = styled.article<
  InferGetStaticPropsType<typeof getStaticProps>
>`
  ${proseStyles}

  /* hide footnotes on the home page */
  .footnotes {
    ${(props) =>
      props.currentPage.kind === "home" &&
      css`
        display: none;
      `}
  }
`;
