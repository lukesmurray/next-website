import { publishDrafts } from "lib/constants/publishDrafts";
import { gql } from "lib/graphql/gql";
import { queryGraphql } from "lib/graphql/queryGraphql";
import { SlugPageQuery, SlugPageQueryVariables } from "prisma/graphql";

export async function slugQueryStaticProps(slug: string) {
  return await queryGraphql<SlugPageQuery, SlugPageQueryVariables>(
    gql`
      query SlugPage($currentSlug: String!, $publishDrafts: Boolean!) {
        root: page(where: { slug: "/" }) {
          slug
          title
          pages(
            orderBy: { date: desc }
            where: {
              OR: [
                { draft: { not: { equals: true } } }
                { draft: { equals: $publishDrafts } }
              ]
            }
          ) {
            slug
            title
            kind
            draft
          }
        }
        currentPage: page(where: { slug: $currentSlug }) {
          slug
          title
          kind
          content
          date
          draft
          description
          filePath
          image
          parent {
            slug
            title
            kind
            draft
            pages(
              orderBy: { date: desc }
              where: {
                OR: [
                  { draft: { not: { equals: true } } }
                  { draft: { equals: $publishDrafts } }
                ]
              }
            ) {
              slug
              title
              kind
              draft
            }
          }
          pages(
            orderBy: { date: desc }
            where: {
              OR: [
                { draft: { not: { equals: true } } }
                { draft: { equals: $publishDrafts } }
              ]
            }
          ) {
            slug
            title
            kind
            draft
            date
            description
          }
        }
        recentPosts: pages(
          orderBy: { date: desc }
          where: {
            AND: [
              {
                OR: [
                  { draft: { not: { equals: true } } }
                  { draft: { equals: $publishDrafts } }
                ]
              }
              { isSection: { equals: false } }
            ]
          }
          take: 5
        ) {
          slug
          title
          kind
          draft
          date
          description
        }
      }
    `,
    {
      currentSlug: slug,
      publishDrafts,
    }
  );
}
