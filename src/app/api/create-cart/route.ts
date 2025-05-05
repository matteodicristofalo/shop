import { fetchShopify } from "@utils/shopify/fetch";
import { createCartQuery } from "@utils/shopify/queries/cart";
import { ShopifCreateCartResponse } from "@utils/shopify/responses/cart";

export async function POST() {
  const response = await fetchShopify<ShopifCreateCartResponse>(
    createCartQuery
  );

  if (!response) {
    return new Response("Failed to create cart", { status: 500 });
  }

  return new Response(JSON.stringify(response.data.cartCreate.cart));
}
