import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { animated, useSpring } from "react-spring";

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        backgroundColor: "#46e891",
        borderRadius: 16,
        ...styles,
      }}
    />
  );
}

export const getStaticProps = async (
  context: GetStaticPropsContext<ParsedUrlQuery>
) => {
  return {
    props: {},
  };
};
