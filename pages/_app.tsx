/**
 * https://nextjs.org/docs/advanced-features/custom-app
 */
import type { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* normalize rendering across browsers  */}
      {/* https://unpkg.com/tailwindcss@2.0.4/dist/base.css */}
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
