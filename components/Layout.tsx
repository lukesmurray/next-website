import { InferGetStaticPropsType } from "next";
import React from "react";
import { getStaticProps } from "../pages/[[...slug]]";
import { Header } from "./Header";

export const Layout: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <>
      <Header {...props} />
      <main>{props.children}</main>
      <footer></footer>
    </>
  );
};
