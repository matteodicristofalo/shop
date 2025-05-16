export const productsInCategoryQuery = (id: string) => `
  query GetProductsInCategory {
    collection(id: "gid://shopify/Collection/639477383501") {
      products(first: 10, filters: {category: { id: "${id}" } }) {
        nodes {
          id
          title
          priceRange {
            minVariantPrice {
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
    }
  }
`;
