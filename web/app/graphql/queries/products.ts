export const QUERY_PRODUCT_BY_ID = /* GraphQL */ `
  query Product($productId: String) {
    product(id: $productId) {
      title
      categories
      description
      image
    }
  }
`;
