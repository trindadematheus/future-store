import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://future-store-api.vercel.app/api/graphql"
);

export default client;
