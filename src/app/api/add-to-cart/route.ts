import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifAddToCartResponse } from "@utils/shopify/responses/cart";
import { toCart } from "@converters/cart";

export async function POST(request: Request) {
  const { cartId, variantId } = await request.json();

  if (!cartId) {
    return new Response("cartId is required", { status: 400 });
  }

  if (!variantId) {
    return new Response("variantId is required", { status: 400 });
  }

  const query = `
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
          totalQuantity
          checkoutUrl
        }
      }
    }    
  `;

  const response = await fetchShopify<ShopifAddToCartResponse>(query, {
    cartId,
    variantId,
  });

  if (!response) {
    return new Response("Error adding item to the cart", { status: 500 });
  }

  const shopifyCart = response.data.cartLinesAdd.cart;

  const cart = toCart(shopifyCart);

  return new Response(JSON.stringify(cart));
}
