import { InferGetStaticPropsType } from "next";
import React from "react";
import { getStaticProps } from "../pages/[[...slug]]";
import { Breadcrumbs } from "./Breadcrumbs";
import { Cluster } from "./every-layout/Cluster";
import { HeaderSectionLinks } from "./HeaderSectionLinks";
import { Logo } from "./Logo";

export const Header: React.VFC<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  return (
    <header>
      <Cluster justify="space-between" align="center">
        <div>
          <Logo {...props} />
          <HeaderSectionLinks {...props} />
        </div>
      </Cluster>
      <Breadcrumbs {...props} />
    </header>
  );
};
