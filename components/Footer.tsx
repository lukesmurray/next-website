import { InferGetStaticPropsType } from "next";
import React from "react";
import tw from "twin.macro";
import { isDefined } from "../lib/types/isDefined";
import { getStaticProps } from "../pages/[[...slug]]";
import { EditOnGithub } from "./EditOnGithub";

export const Footer: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  return (
    <footer css={tw`text-gray-500 text-center`}>
      {/* if the page has a file then add an edit on github link */}
      {isDefined(currentPage.filePath) && (
        <div css={tw`flex justify-end`}>
          <EditOnGithub filePath={currentPage.filePath} />
        </div>
      )}
      {/* render the footer text */}
      <div> © Luke Murray {new Date().getFullYear()}</div>
    </footer>
  );
};
