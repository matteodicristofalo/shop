import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifGetCartResponse } from "@utils/shopify/responses/cart";
import { Cart } from "@models/cart";
import { flattenCartLine } from "@utils/shopify/services/cart";
import { getBrand, getName } from "@utils/shopify/services/products";

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

  const response = await fetchShopify<ShopifGetCartResponse>(query);

  if (!response) {
    return new Response("Error fetching cart", { status: 500 });
  }

  const { id, lines, checkoutUrl } = response.data.cart;

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
