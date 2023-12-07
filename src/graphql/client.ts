import { GraphQLClient } from "graphql-request";

const url =
  "https://api-ca-central-1.graphcms.com/v2/cktdqd3g92bga01xkbxaiebnf/master" ||
  "";

const client = new GraphQLClient(url, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
  },
});

export default client;
