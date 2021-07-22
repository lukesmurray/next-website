import React, { ReactNode } from "react";
import { githubFilePath } from "../lib/utils/githubFilePath";

export const GithubFileLink = (props: {
  filePath: string;
  children?: ReactNode;
}) => <a href={githubFilePath(props.filePath)}>{props.children ?? "Github"}</a>;
