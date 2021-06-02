import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "./mdxComponents";

export const MDX: React.VFC<{ mdx: MDXRemoteSerializeResult; slug: string }> = (
  props
) => {
  return <MDXRemote {...props.mdx} components={mdxComponents(props.slug)} />;
};
