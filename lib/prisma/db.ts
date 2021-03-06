/**
 * create a singleton prisma client
 *
 * usage
 *
 * import { prisma } from db.ts
 *
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient;
}

export let prisma: PrismaClient;

// check to use this workaround only in development and not in production
if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.prismaClient) {
    global.prismaClient = createPrismaClient();
  }
  prisma = global.prismaClient;
}

function createPrismaClient() {
  return new PrismaClient();
}
