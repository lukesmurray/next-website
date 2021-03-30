/**
 * https://nextjs.org/docs/advanced-features/custom-document
 */
import { extractCritical } from "@emotion/server";
import { EmotionCritical } from "@emotion/server/types/create-instance";
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document<DocumentProps & EmotionCritical> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const page = await ctx.renderPage();
    const styles = extractCritical(page.html);
    return { ...initialProps, ...page, ...styles };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            data-emotion-css={this.props.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                if (typeof window !== "undefined") {
                  window.__onThemeChange = function() {};
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    preferredTheme = newTheme;
                    document.body.className = newTheme;
                    window.__onThemeChange(newTheme);
                  }
                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }
                  window.__setPreferredTheme = function(newTheme) {
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) {}
                  }
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  darkQuery.addListener(function(e) {
                    window.__setPreferredTheme(e.matches ? 'dark' : 'light')
                  });
                  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
                }
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
