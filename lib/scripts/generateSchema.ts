/**
 * Script to generate the graphql schema.gql file
 */
import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
import path from "path";
import { buildSchema } from "type-graphql";

// TODO(lukemurray): this isn't dry, we also build schema in graphqlServer
// but it's hard to merge the two since we can't have top level await
buildSchema({
  resolvers,
  validate: false,
  emitSchemaFile: path.join(process.cwd(), "prisma", "schema.gql"),
});
