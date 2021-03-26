import { isValidHttpUrl } from "lib/utils/isValidHttpUrl";
import path from "path";

export const resolveImgUrlInWeb = (
  src: string | undefined,
  slug: string
): string | undefined => {
  if (src === undefined) {
    return src;
  }
  return isValidHttpUrl(src)
    ? src
    : require(`../../content${slug}/${src}`).default;
};

export const resolveImgUrlInBuild = (
  src: string | undefined,
  slug: string
): string | undefined => {
  if (src === undefined) {
    return src;
  }
  return isValidHttpUrl(src)
    ? src
    : path.join(process.cwd(), "content", slug, src);
};
