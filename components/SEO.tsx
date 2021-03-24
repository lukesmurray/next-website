import { publicUrl } from "lib/constants/publicUrl";
import { twitterHandle } from "lib/constants/social";
import { isDefined } from "lib/types/isDefined";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { getStaticProps } from "pages/[[...slug]]";

export const SEO: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { currentPage, root } = props;

  const imageSlug = isDefined(currentPage.image)
    ? `${publicUrl}${
        require(`../content${currentPage.slug}/${currentPage.image}`).default
      }`
    : undefined;

  const pageUrl = `${publicUrl}${currentPage.slug}`;

  return (
    <Head>
      <title>{`${currentPage.title} | ${root.title}`}</title>
      {isDefined(currentPage.description) && (
        <meta name="description" content={currentPage.description} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={currentPage.title} />
      <meta property="og:url" content={pageUrl} />
      {isDefined(currentPage.description) && (
        <meta property="og:description" content={currentPage.description} />
      )}
      <meta property="og:site_name" content={root.title} />
      {isDefined(imageSlug) && <meta property="og:image" content={imageSlug} />}
      <meta
        property="twitter:card"
        content={isDefined(imageSlug) ? "summary_large_image" : `summary`}
      />
      <meta property="twitter:creator" content={twitterHandle} />
      <meta property="twitter:title" content={currentPage.title} />
      {isDefined(currentPage.description) && (
        <meta
          property="twitter:description"
          content={currentPage.description}
        />
      )}
      {isDefined(imageSlug) && (
        <meta property="twitter:image" content={imageSlug} />
      )}
    </Head>
  );
};
