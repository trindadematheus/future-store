import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

import { ProductConnection } from "./Product";

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "Categories type",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    products: {
      type: new GraphQLNonNull(ProductConnection),
    },
  }),
});

export default CategoryType;
