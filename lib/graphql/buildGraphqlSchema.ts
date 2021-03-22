import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
import path from "path";
import { buildSchema } from "type-graphql";

export function buildGraphqlSchema() {
  return buildSchema({
    resolvers,
    validate: false,
    emitSchemaFile: path.join(process.cwd(), "prisma", "schema.gql"),
  });
}
