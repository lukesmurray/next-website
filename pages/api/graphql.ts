/**
 * Graphql endpoint
 * https://www.apollographql.com/docs/apollo-server/
 */
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    sayHello: String
  }
`;

const resolvers = {
  Query: {
    sayHello() {
      return "Hello World!";
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// disable body parsing (next js default) since it breaks graphql
export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
