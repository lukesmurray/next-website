import { Interpolation, Theme } from "@emotion/react";
import { LazyTippy } from "components/tippy/LazyTippy";
import { MdxRemote } from "next-mdx-remote/types";
import Image from "next/image";
import React, { useMemo } from "react";
import { spacing } from "styles/spacing";
import "tippy.js/animations/scale-extreme.css";
import "tippy.js/dist/tippy.css";
import { css } from "twin.macro";
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
    a: (
      props: React.ClassAttributes<HTMLAnchorElement> &
        React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          css?: Interpolation<Theme>;
        }
    ) => {
      const { children, ...otherProps } = props;
      const classNames = otherProps.className?.split(" ") ?? [];
      const isInternal = classNames.indexOf("internal") !== -1;
      const isFnRef = classNames.indexOf("footnote-ref") !== -1;
      const isFnBackRef = classNames.indexOf("footnote-backref") !== -1;
      if (isInternal && !isFnBackRef) {
        if (isFnRef) {
          // render footnote tippy
          return (
            <a {...otherProps}>
              <LazyTippy
                interactive={true}
                appendTo={() => document.body}
                trigger={"mouseenter focus"}
                content={<ClonedFootnote fnId={props.href!.slice(1)} />}
                interactiveBorder={5}
                interactiveDebounce={75}
                touch={false}
                animation={"tippyFootnoteAnimation"}
                theme={"custom"}
              >
                <span>{props.children}</span>
              </LazyTippy>
            </a>
          );
        } else {
          // render internal link tippy
          return (
            <a {...otherProps}>
              <LazyTippy
                interactive={true}
                appendTo={() => document.body}
                trigger={"mouseenter focus"}
                maxWidth={"none"}
                content={
                  <iframe
                    css={css`
                      width: max(${spacing.prose}, 50vw);
                      max-width: 100vw;
                      height: 450px;
                      max-height: 100vh;
                    `}
                    src={otherProps.href}
                  />
                }
                interactiveBorder={5}
                interactiveDebounce={75}
                touch={false}
                animation={"scale-extreme"}
                theme={"custom"}
              >
                <span>{props.children}</span>
              </LazyTippy>
            </a>
          );
        }
      }
      return <a {...otherProps}>{children}</a>;
    },
  };
  return components;
}
