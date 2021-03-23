import { InferGetStaticPropsType } from "next";
import tw from "twin.macro";
import { hydrateMdxData } from "../lib/mdx/hydrateMdxData";
import { getStaticProps } from "../pages/[[...slug]]";

export const PageContent: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  if (currentPage.content.length === 0) {
    return null;
  }

  const content = hydrateMdxData(currentPage.mdx, currentPage.slug);
  return <article css={tw`prose mx-auto`}>{content}</article>;
};
