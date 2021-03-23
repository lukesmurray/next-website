import { InferGetStaticPropsType } from "next";
import { proseStyles } from "styles/proseStyles";
import tw, { styled } from "twin.macro";
import { hydrateMdxData } from "../lib/mdx/hydrateMdxData";
import { getStaticProps } from "../pages/[[...slug]]";

export const PostBody: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  if (currentPage.content.length === 0) {
    return null;
  }

  const content = hydrateMdxData(currentPage.mdx, currentPage.slug);
  return (
    <PostBodyWrapper css={[proseStyles, tw`mx-auto`]}>
      {content}
    </PostBodyWrapper>
  );
};

export const PostBodyWrapper = styled.article();
