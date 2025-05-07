import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyRemoveFromCartResponse } from "@utils/shopify/responses/cart";
import { toCart } from "@converters/cart";
import { removeFromCartQuery } from "@utils/shopify/queries/cart";

export async function POST(request: Request) {
  const { cartId, lineId, variantId, quantity } = await request.json();

  if (cartId === undefined) {
    return new Response("cartId is required", { status: 400 });
  }

  if (lineId === undefined) {
    return new Response("lineId is required", { status: 400 });
  }

  if (variantId === undefined) {
    return new Response("variantId is required", { status: 400 });
  }

  if (quantity === undefined) {
    return new Response("quantity is required", { status: 400 });
  }

  const response = await fetchShopify<ShopifyRemoveFromCartResponse>(
    removeFromCartQuery,
    {
      cartId,
      lineId,
      variantId,
      quantity,
    }
  );

  if (!response) {
    return new Response("Error removing item from the cart", { status: 500 });
  }

  const shopifyCart = response.data.cartLinesUpdate.cart;
  const cart = toCart(shopifyCart);

  return new Response(JSON.stringify(cart));
}
