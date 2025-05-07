import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyAddToCartResponse } from "@utils/shopify/responses/cart";
import { toCart } from "@converters/cart";
import { addToCartQuery } from "@utils/shopify/queries/cart";

export async function POST(request: Request) {
  const { cartId, variantId } = await request.json();

  if (cartId === undefined) {
    return new Response("cartId is required", { status: 400 });
  }

  if (variantId === undefined) {
    return new Response("variantId is required", { status: 400 });
  }

  const response = await fetchShopify<ShopifyAddToCartResponse>(
    addToCartQuery,
    {
      cartId,
      variantId,
    }
  );

  if (!response) {
    return new Response("Error adding item to the cart", { status: 500 });
  }

  const shopifyCart = response.data.cartLinesAdd.cart;
  const cart = toCart(shopifyCart);

  return new Response(JSON.stringify(cart));
}
