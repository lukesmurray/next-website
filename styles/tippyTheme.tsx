import tw, { css } from "twin.macro";

export const tippyCustomTheme = css`
  .tippy-box[data-theme~="custom"] {
    background-color: var(--bg-surface);
    ${tw`shadow-md`}
  }

  .tippy-box[data-theme~="custom"][data-placement^="top"]
    > .tippy-arrow::before {
    border-top-color: var(--bg-surface);
  }
  .tippy-box[data-theme~="custom"][data-placement^="bottom"]
    > .tippy-arrow::before {
    border-bottom-color: var(--bg-surface);
  }
  .tippy-box[data-theme~="custom"][data-placement^="left"]
    > .tippy-arrow::before {
    border-left-color: var(--bg-surface);
  }
  .tippy-box[data-theme~="custom"][data-placement^="right"]
    > .tippy-arrow::before {
    border-right-color: var(--bg-surface);
  }
`;
