/**
 * Graphql endpoint.
 */
import { IncomingMessage, ServerResponse } from "http";
import { getGraphqlServer } from "../../lib/graphqlServer";

// disable body parsing (next js default) since it breaks graphql
export const config = {
  api: {
    bodyParser: false,
  },
};

// singleton to hold onto the graphql handler
let handler: ((req: any, res: any) => Promise<void>) | null = null;

// handle the graphql api call
export default async (req: IncomingMessage, res: ServerResponse) => {
  handler =
    handler ||
    (await getGraphqlServer()).createHandler({ path: "/api/graphql" });
  return handler(req, res);
};
