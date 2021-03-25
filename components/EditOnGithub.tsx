import React from "react";
import { captionStyles, linkStyles } from "styles/proseStyles";
import { githubRepoSlug } from "../lib/constants/githubRepoSlug";
import { rootDirectory } from "../lib/constants/rootDirectory";

export const EditOnGithub: React.VFC<{ filePath: string }> = (props) => {
  const { filePath } = props;
  return (
    <a
      css={[captionStyles, linkStyles]}
      href={githubFilePath(filePath)}
      target="_blank"
      rel="noopener noreferrer"
    >
      Edit on Github
    </a>
  );
};
export function githubFilePath(filePath: string): string {
  return `${githubRepoSlug}/${rootDirectory}/${filePath}`;
}
