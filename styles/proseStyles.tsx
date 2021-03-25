import tw, { css } from "twin.macro";

/**
 * styling for prose so that all prose elements use the same breakpoints
 */
export const proseStyles = tw`prose prose-sm sm:prose lg:prose-lg`;

/**
 * styling for text so all text widths are the same as the prose widths
 */
export const textSizes = tw`text-sm sm:text-base lg:text-lg`;

export const h1Styles = tw`text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900`;
export const h2Styles = tw`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900`;
export const h3Styles = tw`text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900`;
export const h4Styles = tw`text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900`;
export const captionStyles = css`
  ${textSizes}
  ${tw`text-gray-500`}
`;
export const linkStyles = tw`hover:underline`;
