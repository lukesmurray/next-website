import "reflect-metadata";
import { resolvers } from "@generated/type-graphql";
import path from "path";
import { buildSchema } from "type-graphql";

export function buildGraphqlSchema(emitSchemaFile?: string | boolean) {
  const schemaFilePath = path.join(process.cwd(), "prisma", "schema.gql");
  if (emitSchemaFile === undefined) {
    emitSchemaFile = schemaFilePath;
  }
  return buildSchema({
    resolvers,
    validate: false,
    emitSchemaFile,
  });
}
