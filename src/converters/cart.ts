import { Cart } from "@models/cart";
import { ShopifyCart } from "@utils/shopify/responses/cart";
import { flattenCartLines } from "@utils/shopify/services/cart";
import { getId } from "@utils/shopify/services/generics";
import { getBrand, getName } from "@utils/shopify/services/products";

export function toCart(cart: ShopifyCart): Cart {
  const { id, checkoutUrl, lines, cost } = cart;

  const cartLines = flattenCartLines(lines.nodes).map((line) => ({
    id: line.id,
    merchandise: {
      id: line.merchandise.id,
      title: line.merchandise.title,
      price: line.merchandise.price,
      product: {
        id: getId(line.merchandise.product.id),
        name: getName(line.merchandise.product.title),
        brand: getBrand(line.merchandise.product.title),
        image: line.merchandise.product.featuredImage.src,
      },
    },
  }));

  return {
    id,
    checkoutUrl,
    lines: cartLines,
    totalQuantity: cartLines.length,
    totalAmount: cost.totalAmount,
  };
}
