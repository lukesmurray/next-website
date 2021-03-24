import { InferGetStaticPropsType } from "next";
import { proseStyles } from "styles/proseStyles";
import { styled } from "twin.macro";
import { hydrateMdxData } from "../lib/mdx/hydrateMdxData";
import { getStaticProps } from "../pages/[[...slug]]";

export const PostBody: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  // if the raw text content is empty don't render anything
  const { currentPage } = props;
  if (currentPage.content.length === 0) {
    return null;
  }

  // render the mdx content
  const content = hydrateMdxData(currentPage.mdx, currentPage.slug);
  return <PostBodyWrapper>{content}</PostBodyWrapper>;
};

export const PostBodyWrapper = styled.article`
  ${proseStyles}
`;
