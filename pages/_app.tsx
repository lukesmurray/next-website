/**
 * https://nextjs.org/docs/advanced-features/custom-app
 */
import { Global } from "@emotion/react";
import { ThemeProvider } from "components/theme/ThemeContext";
import type { AppProps } from "next/app";
import React from "react";
import { GlobalStyles } from "twin.macro";
import { globalStyles } from "../styles/globalStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      {/* normalize rendering across browsers  */}
      {/* https://unpkg.com/tailwindcss@2.0.4/dist/base.css */}
      <GlobalStyles />
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
