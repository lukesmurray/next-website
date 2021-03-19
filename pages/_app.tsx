/**
 * https://nextjs.org/docs/advanced-features/custom-app
 */
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
