import { InferGetStaticPropsType } from "next";
import React from "react";
import { captionStyles, h1Styles } from "styles/proseStyles";
import { spacing } from "styles/spacing";
import { isDefined } from "../lib/types/isDefined";
import { getStaticProps } from "../pages/[[...slug]]";
import { Cluster } from "./every-layout/Cluster";
import { Stack } from "./every-layout/Stack";
import { formatDate } from "./formatters/formatDate";
import { formatPageTitle } from "./formatters/formatPageTitle";

export const PostHeader: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  if (currentPage.kind === "home") {
    return null;
  }
  return (
    <Stack space={spacing[4]}>
      {/* render the title as an h1 */}
      <h1 css={h1Styles}>{formatPageTitle(currentPage)}</h1>
      {/* page only details, keep's sections cleaner */}
      {currentPage.kind === "page" && (
        <Cluster>
          <div>
            {isDefined(currentPage.date) && (
              <span css={captionStyles}>{formatDate(currentPage.date)}</span>
            )}
          </div>
        </Cluster>
      )}
    </Stack>
  );
};
