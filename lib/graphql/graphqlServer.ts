/**
 * Create the graphql server as a singleton
 *
 * The server is created using a apollo-server which is backed with resolvers
 * and schema generated using typegraphql-prisma
 *
 * This means that typegraphql-prisma is the source of truth for the api.
 *
 * Create the @generated/type-graphql types using npx prisma generate
 *
 * https://www.npmjs.com/package/typegraphql-prisma
 * https://www.apollographql.com/docs/apollo-server/
 */

// import "reflect-metadata"; must be at the top of this file
import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
import { ApolloServer } from "apollo-server-micro";
import path from "path";
import { buildSchema } from "type-graphql";
import { prisma } from "../prisma/db";

declare global {
  var apolloServer: ApolloServer;
}

let server: ApolloServer | null = null;

/**
 * Create the graphql server
 *
 * @returns the graphql server handler
 */
export async function getGraphqlServer() {
  // in dev mode attach the server to global
  if (process.env.NODE_ENV !== "production") {
    if (global.apolloServer) {
      server = global.apolloServer;
    }
  }

  // return the server if it was previously created
  if (server !== null) {
    return server;
  }

  // We have to use this function indirection because we can't buildSchema
  // at the top levelwith a top level await
  const schema = await buildSchema({
    resolvers,
    validate: false,
    emitSchemaFile: path.join(process.cwd(), "prisma", "schema.gql"),
  });

  // create the server
  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: () => ({ prisma }),
  });

  // set global's and singleton
  server = apolloServer;
  if (process.env.NODE_ENV !== "production") {
    global.apolloServer = server;
  }

  // return the server
  return server;
}
