import { Interpolation, Theme } from "@emotion/react";
import { LazyTippy } from "components/tippy/LazyTippy";
import { MdxRemote } from "next-mdx-remote/types";
import Image from "next/image";
import React, { useMemo } from "react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { ClonedFootnote } from "../../components/ClonedFootnote";
import { resolveImgUrlInWeb } from "../utils/resolveImgUrl";

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
      const { src, height, width, ...rest } = props;
      const imgSrc = useMemo(() => resolveImgUrlInWeb(src, slug), [src, slug]);
      if (height !== undefined && width !== undefined && imgSrc !== undefined) {
        return (
          <Image
            layout="responsive"
            src={imgSrc}
            height={height}
            width={width}
            {...rest}
          />
        );
      }
      return <img {...rest} src={imgSrc} />;
    },
    sup: (
      props: React.ClassAttributes<HTMLElement> &
        React.ImgHTMLAttributes<HTMLElement> & {
          css?: Interpolation<Theme>;
        }
    ) => {
      const { children, ...otherProps } = props;
      // if we found a remark footnote ref
      const fnRefId = otherProps.id;
      if (fnRefId !== undefined && fnRefId.match(/^fnref-.*$/)) {
        // use a tippy to render the footnote contents inline
        return (
          <sup {...otherProps}>
            <LazyTippy
              interactive={true}
              appendTo={() => document.body}
              theme={"light"}
              trigger={"mouseenter focus"}
              content={<ClonedFootnote fnRefId={fnRefId} />}
              interactiveBorder={5}
              interactiveDebounce={75}
              touch={false}
            >
              <span>{props.children}</span>
            </LazyTippy>
          </sup>
        );
      } else {
        // not a remark footnote so just render the sup
        return <sup {...otherProps}>{children}</sup>;
      }
    },
  };
  return components;
}
