/**
 * Graphql endpoint
 * https://www.apollographql.com/docs/apollo-server/
 */
import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-micro";
import { IncomingMessage, ServerResponse } from "http";
import { buildSchema } from "type-graphql";
import path from "path";

// disable body parsing (next js default) since it breaks graphql
export const config = {
  api: {
    bodyParser: false,
  },
};

// singleton to hold onto the graphql handler
let handler: ((req: any, res: any) => Promise<void>) | null = null;

/**
 * Create a graphql server handler
 *
 * @returns the graphql server handler
 */
async function createGraphqlServerHandler() {
  // We have to use this function indirection because we can't buildSchema
  // at the top levelwith a top level await
  const schema = await buildSchema({
    resolvers,
    validate: false,
    emitSchemaFile: path.join(process.cwd(), "prisma", "schema.gql"),
  });

  const prisma = new PrismaClient();

  const apolloServer = new ApolloServer({
    schema,
    playground: true,
    introspection: true,
    context: () => ({ prisma }),
  });
  return apolloServer.createHandler({
    path: "/api/graphql",
  });
}

// handle the graphql api call
export default async (req: IncomingMessage, res: ServerResponse) => {
  handler = handler || (await createGraphqlServerHandler());
  return handler(req, res);
};
