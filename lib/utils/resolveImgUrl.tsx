import { isValidHttpUrl } from "lib/utils/isValidHttpUrl";

/**
 * Resolve an image url (assumes that if the image is local the path is relative to the markdown file)
 */
export const resolveImgUrl = (
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
