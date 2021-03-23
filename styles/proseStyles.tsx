import tw from "twin.macro";

/**
 * styling for prose so that all prose elements use the same breakpoints
 */
export const proseStyles = tw`prose prose-sm sm:prose lg:prose-lg`;

/**
 * styling for text so all text widths are the same as the prose widths
 */
export const textSizes = tw`text-sm sm:text-base lg:text-lg`;
