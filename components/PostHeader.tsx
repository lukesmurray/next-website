import { InferGetStaticPropsType } from "next";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { formatPageTitle } from "./formatters/formatPageTitle";

export const PostHeader: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  if (currentPage.kind !== "page") {
    return null;
  }
  return (
    <div css={tw` max-w-prose mx-auto pt-12 pb-10`}>
      <h1 css={tw`text-3xl font-semibold`}>{formatPageTitle(currentPage)}</h1>
      {currentPage.date && (
        <span css={tw`text-gray-600`}>{currentPage.date}</span>
      )}
    </div>
  );
};
