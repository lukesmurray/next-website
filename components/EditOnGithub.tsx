import React from "react";
import { captionStyles, linkStyles } from "styles/proseStyles";
import { githubFilePath } from "../lib/utils/githubFilePath";

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
