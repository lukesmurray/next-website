import { InferGetStaticPropsType } from "next";
import React from "react";
import { spacing } from "styles/spacing";
import { getStaticProps } from "../pages/[[...slug]]";
import { Center } from "./every-layout/Center";
import { Stack } from "./every-layout/Stack";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <>
      <Header {...props} />
      <Center>
        <Stack as="main" space={spacing["14"]}>
          {props.children}
        </Stack>
      </Center>
      <Footer {...props} />
    </>
  );
};
