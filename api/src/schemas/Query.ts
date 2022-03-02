import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { connectionArgs, connectionFromArray } from "graphql-relay";

import ProductType, { ProductConnection } from "./Product";
import CategoryType from "./Category";
import products from "../data";
import categories from "../data/categories";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    product: {
      type: ProductType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (_, args) => {
        return products.find((product) => product.id === args.id);
      },
    },
    products: {
      type: new GraphQLNonNull(ProductConnection),
      args: connectionArgs,
      resolve: (_, args) => {
        return connectionFromArray(products, args);
      },
    },
    category: {
      type: CategoryType,
      args: {
        categoryName: {
          type: GraphQLString,
        },
        ...connectionArgs,
      },
      resolve: (_, args) => {
        const { categoryName } = args;
        const filteredProducts = products.filter((product) =>
          product.categories.includes(categoryName)
        );

        let result = {
          name: categoryName,
          products: connectionFromArray(filteredProducts, args),
        };

        return result;
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      args: connectionArgs,
      resolve: (_, args) => {
        const result = categories.reduce((acc, curr) => {
          const filteredProducts = products.filter((product) =>
            product.categories.includes(curr)
          );

          acc.push({
            name: curr,
            products: connectionFromArray(filteredProducts, args),
          });

          return acc;
        }, []);

        return result;
      },
    },
  }),
});

export default QueryType;
