import tw, { css } from "twin.macro";
import { textSizes } from "./proseStyles";

export const globalStyles = css`
  html {
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  body {
    ${tw`p-2 md:p-4 pb-0`}

    /* set the default font to be sans-serif */
    ${tw`font-sans`}

    /* set font sizes to follow prose sizes */
    ${textSizes}
  }

  #__next {
    display: flex;
    flex-direction: column;

    & > main {
      flex-grow: 1;
    }
  }
`;
