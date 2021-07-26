import tw, { css } from "twin.macro";
import { textSizes } from "./proseStyles";
import { stylesBase } from "./stylesBase";
import { syntaxStyles } from "./syntaxStyles";
import { tippyFootnoteAnimation } from "./tippyAnimation";
import { tippyCustomTheme } from "./tippyTheme";

/**
 * Fix the code width on smaller screens
 */
const codeWidthStyles = css`
  pre {
    max-width: calc(100vw - 2rem);

    /* when the screen is small set the max-width to the screen size
    because 65ch of code is larger than the screen size */
    @media (max-width: 600px) {
      @supports (max-width: min(calc(100vw - 2rem), 65ch)) {
        max-width: min(calc(100vw - 2rem), 65ch);
      }
    }
  }
`;

export const globalStyles = css`
  /* normalize the html/body height */
  html,
  body,
  #__next {
    height: 100%;
  }

  html {
    /* enable smooth scrolling */
    scroll-behavior: smooth;
  }

  /* create global inherited styles */
  body {
    /* set the default font to be sans-serif */
    ${tw`font-sans`}

    /* set font sizes to follow prose sizes */
    ${textSizes}
  }

  /* hide emotion style tags (these can show up in ssr content) */
  style {
    display: none !important;
  }

  /* add prism code highlighting */
  ${syntaxStyles}

  /* add theme styles */
  ${stylesBase}

  ${tippyFootnoteAnimation}

  ${tippyCustomTheme}

  ${codeWidthStyles}
`;
