import React from "react";

export function formatPageTitle(page: {
  title: string;
  draft: boolean;
}): React.ReactNode {
  return `${page.title}${page.draft === true ? " [DRAFT]" : ""}`;
}
