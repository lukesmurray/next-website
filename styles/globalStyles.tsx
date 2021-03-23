import tw, { css } from "twin.macro";

export const globalStyles = css`
  html {
    ${tw`font-sans`}
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    ${tw`p-2 md:p-4 pb-0`}
  }

  #__next {
    display: flex;
    flex-direction: column;

    & > main {
      flex-grow: 1;
    }
  }
`;
