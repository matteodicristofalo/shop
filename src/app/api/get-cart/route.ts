import { fetchShopify } from "@utils/shopify/fetch";
import { GetCartResponse } from "@utils/shopify/responses/cart";
import { Cart } from "@models/cart";

export async function POST(request: Request) {
  const { cartId } = await request.json();

  if (!cartId) {
    return new Response("cartId is required", { status: 400 });
  }

  const query = `{
    cart(id: "${cartId}") {
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
  }`;

  const response = await fetchShopify<GetCartResponse>(query);

  if (!response) {
    return new Response("Error fetching cart", { status: 500 });
  }

  const cart: Cart = {
    id: response.data.cart.id,
    lines: response.data.cart.lines.nodes.map((line) => ({
      id: line.id,
      merchandise: {
        title: line.merchandise.title,
        price: line.merchandise.price,
        product: {
          id: line.merchandise.product.id,
          title: line.merchandise.product.title,
          image: line.merchandise.product.featuredImage.src,
        },
      },
      quantity: line.quantity,
    })),
    totalQuantity: response.data.cart.totalQuantity,
    checkoutUrl: response.data.cart.checkoutUrl,
  };

  return new Response(JSON.stringify(cart));
}
