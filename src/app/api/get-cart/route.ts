import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifGetCartResponse } from "@utils/shopify/responses/cart";
import { toCart } from "@converters/cart";
import { getCartQuery } from "@utils/shopify/queries/cart";

export async function POST(request: Request) {
  const { cartId } = await request.json();

  if (!cartId) {
    return new Response("cartId is required", { status: 400 });
  }

  const query = getCartQuery(cartId);
  const response = await fetchShopify<ShopifGetCartResponse>(query);

  if (!response) {
    return new Response("Error fetching cart", { status: 500 });
  }

  const shopifyCart = response.data.cart;

  const cart = toCart(shopifyCart);

  return new Response(JSON.stringify(cart));
}
