export const getProductQuery = (id: string) => `
  query GetProduct {
    product(id: "gid://shopify/Product/${id}") {
      id
      title
      description
      availableForSale
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 20) {
        nodes {
          src
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
        }
      }
    }
  }
`;
