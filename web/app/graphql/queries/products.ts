export const QUERY_PRODUCTS = /* GraphQL */ `
  query Products() {
    job(id: $id) {
      id
      title
      locale
      description
      published_at
    }
  }
`;
