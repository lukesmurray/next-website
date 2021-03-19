import { parse, stringify } from "flatted";
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import { getAllContent } from "../lib/api";

export default function Home({ fileTree, content }) {
  console.log(parse(fileTree));
  return (
    <div>
      <div>this is also my home page</div>
      <div>
        {content.map((p) => {
          return (
            <div key={p.slug}>
              <Link href={p.slug}>
                <a>Go to {p.slug}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { allFiles, fileTree } = await getAllContent();

  return {
    props: { content: allFiles, fileTree: stringify(fileTree) },
  };
};
