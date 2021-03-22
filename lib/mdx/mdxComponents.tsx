import { Interpolation, Theme } from "@emotion/react";
import { MdxRemote } from "next-mdx-remote/types";
import React from "react";

/**
 * Create mdx components
 * @param slug the slug for the mdx data to be rendered
 * @returns the mdx components for that page
 */
export function mdxComponents(slug: string): MdxRemote.Components {
  const components: MdxRemote.Components = {
    img: (
      props: React.ClassAttributes<HTMLImageElement> &
        React.ImgHTMLAttributes<HTMLImageElement> & {
          css?: Interpolation<Theme>;
        }
    ) => {
      const { src, ...otherProps } = props;
      return <img {...otherProps} />;
    },
  };
  return components;
}
