import React from "react";
import { Maybe } from "../../prisma/graphql";

export function formatPageTitle(page: {
  title: string;
  draft?: Maybe<boolean> | undefined;
}): React.ReactNode {
  return `${page.title}${page.draft === true ? " [DRAFT]" : ""}`;
}
