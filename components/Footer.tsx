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
    <footer css={tw`pt-20 pb-2 text-gray-500 text-center`}>
      {isDefined(currentPage.filePath) && (
        <div css={tw`flex justify-end`}>
          <EditOnGithub filePath={currentPage.filePath} />
        </div>
      )}
      <div> © Luke Murray {new Date().getFullYear()}</div>
    </footer>
  );
};
