import { Cart } from "@models/cart";
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

  const shopifyCart = response.data.cartCreate.cart;
  const cart: Omit<Cart, "lines" | "totalQuantity"> = {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalAmount: shopifyCart.cost.totalAmount,
  };

  return new Response(JSON.stringify(cart));
}
