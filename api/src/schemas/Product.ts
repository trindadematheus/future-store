import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions } from "graphql-relay";

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Products type",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: (product) => product.id,
    },
    title: {
      type: GraphQLString,
      resolve: (product) => product.title,
    },
    description: {
      type: GraphQLString,
      resolve: (product) => product.description,
    },
    image: {
      type: GraphQLString,
      resolve: (product) => product.image,
    },
    categories: {
      type: new GraphQLList(GraphQLString),
      resolve: (product) => product.categories,
    },
  }),
});

const { connectionType: ProductConnection, edgeType: ProductEdge } =
  connectionDefinitions({
    nodeType: ProductType,
  });

export { ProductConnection, ProductEdge };

export default ProductType;
