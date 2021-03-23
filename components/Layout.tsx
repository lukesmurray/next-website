import { InferGetStaticPropsType } from "next";
import React from "react";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <>
      <Header {...props} />
      <main
        css={css`
          article + section {
            ${tw`pt-14`}
          }
        `}
      >
        {props.children}
      </main>
      <Footer {...props} />
    </>
  );
};
