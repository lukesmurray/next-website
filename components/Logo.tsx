import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { animated } from "react-spring";
import { h2Styles, linkStyles } from "styles/proseStyles";
import { getStaticProps } from "../pages/[[...slug]]";
import { useBoop } from "./hooks/useBoop";

export const Logo: React.VFC<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const { root } = props;

  const [style, trigger] = useBoop({ rotation: 5 });

  return (
    <animated.h2 style={style}>
      <Link href={"/"} passHref>
        <a css={[h2Styles, linkStyles]} onMouseEnter={trigger}>
          {root.title}
        </a>
      </Link>
    </animated.h2>
  );
};
