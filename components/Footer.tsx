import { InferGetStaticPropsType } from "next";
import React from "react";
import { captionStyles } from "styles/proseStyles";
import { spacing } from "styles/spacing";
import tw from "twin.macro";
import { isDefined } from "../lib/types/isDefined";
import { getStaticProps } from "../pages/[[...slug]]";
import { EditOnGithub } from "./EditOnGithub";
import { Center } from "./every-layout/Center";
import { Stack } from "./every-layout/Stack";

export const Footer: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { currentPage } = props;
  return (
    <Center as="footer" intrinsic={true} andText={true}>
      <Stack space={spacing[2]} css={tw`mb-4`}>
        {/* if the page has a file then add an edit on github link */}
        {isDefined(currentPage.filePath) && (
          <EditOnGithub filePath={currentPage.filePath} />
        )}
        {/* render the footer text */}
        <span css={captionStyles}>
          © Luke Murray {new Date().getFullYear()}
        </span>
      </Stack>
    </Center>
  );
};
