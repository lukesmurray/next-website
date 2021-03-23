import { InferGetStaticPropsType } from "next";
import React from "react";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageListWrapper } from "./PageList";
import { PostBodyWrapper } from "./PostBody";

export const Layout: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <>
      <Header {...props} />
      <main
        css={css`
          ${PostBodyWrapper} + ${PageListWrapper} {
            ${tw`pt-20`}
          }
        `}
      >
        {props.children}
      </main>
      <Footer {...props} />
    </>
  );
};
