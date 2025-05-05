export const createCartQuery = `
  mutation cartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const getCartQuery = (cartId: string) => `
  {
    cart(id: "${cartId}") {
      id
      lines(first: 20) {
        nodes {
          id
          merchandise {
            ... on ProductVariant {
              title
              price {
                amount
                currencyCode
              }
              product {
                id
                title
                featuredImage {
                  src
                }
              }
            }
          }
          quantity
        }
      }
      checkoutUrl
    }
  }
`;

export const addToCartQuery = `
  mutation AddToCart($cartId: ID!, $variantId: ID!) {
    cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $variantId, quantity: 1 }]) {
      cart {
        id
        lines(first: 20) {
          nodes {
            id
            merchandise {
              ... on ProductVariant {
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  featuredImage {
                    src
                  }
                }
              }
            }
            quantity
          }
        }
        checkoutUrl
      }
    }
  }    
`;
