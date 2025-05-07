export const createCartQuery = `
  mutation cartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export const getCartQuery = (cartId: string) => `
  {
    cart(id: "${cartId}") {
      id
      checkoutUrl
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 20) {
        nodes {
          id
          merchandise {
            ... on ProductVariant {
              id
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
    }
  }
`;

export const addToCartQuery = `
  mutation AddToCart($cartId: ID!, $variantId: ID!) {
    cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $variantId, quantity: 1 }]) {
      cart {
        id
        checkoutUrl
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 20) {
          nodes {
            id
            merchandise {
              ... on ProductVariant {
                id
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
      }
    }
  }    
`;
