import { InferGetStaticPropsType } from "next";
import React from "react";
import { getStaticProps } from "../pages/[[...slug]]";
import { Breadcrumbs } from "./Breadcrumbs";
import { Cluster } from "./every-layout/Cluster";
import { HeaderSectionLinks } from "./HeaderSectionLinks";
import { Logo } from "./Logo";
import ThemeToggle from "./theme/ThemeToggle";

export function Header(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <header>
      <Cluster justify="space-between" align="center">
        <div>
          <Logo {...props} />
          <Cluster>
            <div>
              <HeaderSectionLinks {...props} />
              <ThemeToggle />
            </div>
          </Cluster>
        </div>
      </Cluster>
      <Breadcrumbs {...props} />
    </header>
  );
}
