export const productRecommendationsQuery = (id: string) => `
  query GetRecommendations {
    productRecommendations(productId: "gid://shopify/Product/${id}") {
      id
      title
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 2) {
        nodes {
          src
        }
      }
    }
  }
`;
