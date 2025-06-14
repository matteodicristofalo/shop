export const productsInCategoryQuery = (id: string) => `
  query GetProductsInCategory {
    collection(id: "gid://shopify/Collection/639477383501") {
      products(first: 10, filters: {category: { id: "${id}" } }) {
        nodes {
          id
          handle
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
    }
  }
`;
