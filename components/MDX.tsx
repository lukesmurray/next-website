import { MdxRemote } from "next-mdx-remote/types";
import { hydrateMdxData } from "../lib/mdx/hydrateMdxData";

export const MDX: React.VFC<{ mdx: MdxRemote.Source; slug: string }> = (
  props
) => {
  const content = hydrateMdxData(props.mdx, props.slug);
  return <>{content}</>;
};
