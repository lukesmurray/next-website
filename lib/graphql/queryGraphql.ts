// from https://github.com/vercel/next.js/blob/canary/examples/api-routes-apollo-server/shared/query-graphql/index.js
// allows for querying graphql in static generated code
import { graphql, GraphQLError, GraphQLSchema, Source } from "graphql";
import { prisma } from "../prisma/db";
import { buildGraphqlSchema } from "./buildGraphqlSchema";

let _schema: GraphQLSchema | null = null;

export async function queryGraphql<
  TData = any,
  TVariables = Record<string, any> | null | undefined,
  TExtensions = { [key: string]: any }
>(query: string | Source, variableValues?: TVariables) {
  const schema = _schema ?? (await buildGraphqlSchema());
  _schema = schema;
  return (await graphql({
    schema,
    source: query,
    variableValues,
    contextValue: {
      prisma,
    },
  })) as {
    errors?: ReadonlyArray<GraphQLError>;
    // TS_SPECIFIC: TData. Motivation: https://github.com/graphql/graphql-js/pull/2490#issuecomment-639154229
    data?: TData;
    extensions?: TExtensions;
  };
}
