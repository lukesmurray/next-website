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
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
