import { GraphQLSchema } from "graphql";

import QueryType from "./Query";

export const schema = new GraphQLSchema({
  query: QueryType,
});
