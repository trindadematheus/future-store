export const QUERY_HOME = /* GraphQL */ `
  query CategoriesAndProducts($first: Int) {
    categories(first: $first) {
      name
      products {
        edges {
          node {
            title
            image
          }
        }
      }
    }
  }
`;
