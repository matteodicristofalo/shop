import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyGetCartResponse } from "@utils/shopify/responses/cart";
import { toCart } from "@converters/cart";
import { getCartQuery } from "@utils/shopify/queries/cart";

export async function POST(request: Request) {
  const { cartId } = await request.json();

  if (cartId === undefined) {
    return new Response("cartId is required", { status: 400 });
  }

  const query = getCartQuery(cartId);
  const response = await fetchShopify<ShopifyGetCartResponse>(query);

  if (!response) {
    return new Response("Error fetching cart", { status: 500 });
  }

  const shopifyCart = response.data.cart;

  if (!shopifyCart) {
    return new Response("Cart not found", { status: 404 });
  }

  const cart = toCart(shopifyCart);

  return new Response(JSON.stringify(cart));
}
