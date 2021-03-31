import React from "react";
import { proseStyles } from "styles/proseStyles";

type ClonedFootnoteProps = {
  fnId: string;
};
export const ClonedFootnote: React.VFC<ClonedFootnoteProps> = (props) => {
  // the fnRef id is something like fnref-1
  // the fn id is something like fn-1
  // we just replace fnref with fn
  const fnId = `${props.fnId}`;

  return (
    <div
      css={proseStyles}
      dangerouslySetInnerHTML={{
        __html: (document.getElementById(fnId)?.innerHTML ?? "").replaceAll(
          props.fnId,
          fnId
        ),
      }}
    />
  );
};
