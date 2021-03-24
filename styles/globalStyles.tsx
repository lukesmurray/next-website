import tw, { css } from "twin.macro";
import { textSizes } from "./proseStyles";

export const globalStyles = css`
  /* css variables */
  :root {
    /* from tw'max-width-prose' */
    --measure: 65ch;
  }

  /* normalize the html/body height */
  html,
  body,
  #__next {
    height: 100%;
  }

  /* create global inherited styles */
  body {
    /* set the default font to be sans-serif */
    ${tw`font-sans`}

    /* set font sizes to follow prose sizes */
    ${textSizes}
  }
`;
