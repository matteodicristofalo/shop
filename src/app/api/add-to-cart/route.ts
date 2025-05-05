import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifAddToCartResponse } from "@utils/shopify/responses/cart";
import { Cart } from "@models/cart";
import { flattenCartLine } from "@utils/shopify/services/cart";
import { getBrand, getName } from "@utils/shopify/services/products";

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

  const { id, lines, checkoutUrl } = response.data.cartLinesAdd.cart;

  const flattenCartLines = flattenCartLine(lines.nodes);

  const cartLines = flattenCartLines.map((line) => ({
    id: line.id,
    merchandise: {
      title: line.merchandise.title,
      price: line.merchandise.price,
      product: {
        id: line.merchandise.product.id,
        name: getName(line.merchandise.product.title),
        brand: getBrand(line.merchandise.product.title),
        image: line.merchandise.product.featuredImage.src,
      },
    },
  }));

  const cart: Cart = {
    id,
    checkoutUrl,
    lines: cartLines,
    totalQuantity: cartLines.length,
  };

  return new Response(JSON.stringify(cart));
}
