import { gql } from "lib/graphql/gql";
import { queryGraphql } from "lib/graphql/queryGraphql";
import {
  SlugStaticPathsQuery,
  SlugStaticPathsQueryVariables,
} from "prisma/graphql";

export async function slugQueryStaticPaths() {
  return await queryGraphql<
    SlugStaticPathsQuery,
    SlugStaticPathsQueryVariables
  >(gql`
    query SlugStaticPaths {
      pages {
        slug
        title
        description
        date
        kind
        draft
        content
      }
    }
  `);
}
