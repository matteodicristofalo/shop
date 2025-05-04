import { fetchShopify } from "@utils/shopify/fetch";
import { CreateCartResponse } from "@utils/shopify/responses/cart";

export async function POST() {
  const query = `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  const response = await fetchShopify<CreateCartResponse>(query);

  if (!response) {
    return new Response("Failed to create cart", { status: 500 });
  }

  return new Response(JSON.stringify(response.data.cartCreate.cart));
}
