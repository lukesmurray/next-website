import { InferGetStaticPropsType } from "next";
import React from "react";
import { spacing } from "styles/spacing";
import { styled } from "twin.macro";
import { getStaticProps } from "../pages/[[...slug]]";
import { Center } from "./every-layout/Center";
import { Stack } from "./every-layout/Stack";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC<InferGetStaticPropsType<typeof getStaticProps>> =
  (props) => {
    return (
      <HeaderMainFooterLayout gutter={spacing[4]}>
        <Header {...props} />
        <Center>
          <Stack as="main" space={spacing["12"]}>
            {props.children}
          </Stack>
        </Center>
        <Footer {...props} />
      </HeaderMainFooterLayout>
    );
  };

type HeaderMainFooterLayoutProps = {
  /**
   * The gutter on the left and right side of the page
   */
  gutter: string;
};

const HeaderMainFooterLayout = styled.div<HeaderMainFooterLayoutProps>`
  /* simple header, main, footer layout */
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: ${spacing[16]};
  box-sizing: content-box;
  margin-left: ${(props) => props.gutter};
  margin-right: ${(props) => props.gutter};
`;
