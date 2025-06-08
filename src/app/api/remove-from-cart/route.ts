import { fetchShopify } from "@utils/shopify";
import { ShopifyRemoveFromCartResponse } from "@utils/shopify/responses/cart.responses";
import { getCart } from "@domain/converters/cart.converters";
import { removeFromCartQuery } from "@utils/shopify/queries/cart.queries";

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
  const cart = getCart(shopifyCart);

  return new Response(JSON.stringify(cart));
}
