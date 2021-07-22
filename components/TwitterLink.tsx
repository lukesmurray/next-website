import React, { ReactNode } from "react";
import { twitterUrl } from "../lib/constants/twitterUrl";

export const TwitterLink = (props: {
  filePath: string;
  children?: ReactNode;
}) => <a href={twitterUrl}>{props.children ?? "Twitter"}</a>;
