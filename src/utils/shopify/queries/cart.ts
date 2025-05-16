export const createCartQuery = `
  mutation CreateCart {
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
  query GetCart {
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

export const removeFromCartQuery = `
  mutation RemoveFromCart($cartId: ID!, $lineId: ID!, $variantId: ID!, $quantity: Int!) {
    cartLinesUpdate(cartId: $cartId, lines: [{ id: $lineId, merchandiseId: $variantId, quantity: $quantity }]) {
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
