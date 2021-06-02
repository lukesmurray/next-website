import { feedSlugs } from "lib/feed/feedConstants";
import React from "react";
import { captionStyles, linkStyles } from "styles/proseStyles";

export const RssLink: React.VFC = () => {
  return (
    <a
      css={[captionStyles, linkStyles]}
      href={feedSlugs.rss}
      target="_blank"
      rel="noopener noreferrer"
    >
      RSS
    </a>
  );
};
