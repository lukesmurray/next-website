import { InferGetStaticPropsType } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getStaticProps } from "pages/[[...slug]]";
import { mdxComponents } from "./mdxComponents";

export const MDX: React.VFC<{
  mdx: MDXRemoteSerializeResult;
  slug: string;
  scope: InferGetStaticPropsType<typeof getStaticProps>;
}> = (props) => {
  return (
    <MDXRemote
      {...props.mdx}
      components={mdxComponents(props.slug)}
      scope={props.scope}
    />
  );
};
