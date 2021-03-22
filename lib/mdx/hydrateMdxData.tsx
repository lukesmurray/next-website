import hydrate from "next-mdx-remote/hydrate";
import { MdxRemote } from "next-mdx-remote/types";
import { mdxComponents } from "./mdxComponents";

export function hydrateMdxData(mdx: MdxRemote.Source, slug: string) {
  return hydrate(mdx, {
    components: mdxComponents(slug),
  });
}
