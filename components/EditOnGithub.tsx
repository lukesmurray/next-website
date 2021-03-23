import React from "react";
import tw from "twin.macro";
import { githubSlug } from "../lib/constants/githubSlug";
import { rootDirectory } from "../lib/constants/rootDirectory";

export const EditOnGithub: React.VFC<{ filePath: string }> = (props) => {
  const { filePath } = props;
  return (
    <a
      css={tw`hover:underline`}
      href={githubFilePath(filePath)}
      target="_blank"
    >
      Edit on Github
    </a>
  );
};
export function githubFilePath(filePath: string): string {
  return `${githubSlug}/${rootDirectory}/${filePath}`;
}
