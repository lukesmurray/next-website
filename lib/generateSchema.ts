import { resolvers } from "@generated/type-graphql";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";

// TODO(lukemurray): this isn't dry, we also build schema in graphqlServer
// but it's hard to merge the two since we can't have top level await
buildSchema({
  resolvers,
  validate: false,
  emitSchemaFile: path.join(process.cwd(), "prisma", "schema.gql"),
});
