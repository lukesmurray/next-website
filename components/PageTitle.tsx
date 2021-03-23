import { InferGetStaticPropsType } from "next";
import tw from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";

export const PageTitle: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  if (currentPage.kind !== "page") {
    return null;
  }
  return (
    <div css={tw` max-w-prose mx-auto pt-12 pb-10`}>
      <h1 css={tw`text-3xl font-semibold`}>{currentPage.title}</h1>
      {currentPage.date && (
        <span css={tw`text-gray-600`}>{currentPage.date}</span>
      )}
    </div>
  );
};
