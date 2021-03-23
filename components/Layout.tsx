import { InferGetStaticPropsType } from "next";
import React from "react";
import tw, { css } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
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
      <footer css={tw`pt-20 pb-2 mx-auto text-gray-500 text-center`}>
        © Luke Murray {new Date().getFullYear()}
      </footer>
    </>
  );
};
