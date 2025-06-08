import { Cart } from "@domain/models/cart.models";
import { getId } from "@domain/services/ids.service";
import { getBrand, getName } from "@domain/converters/product.converters";
import {
  ShopifyCart,
  ShopifyCartLine,
} from "@utils/shopify/responses/cart.responses";

export function getCart(cart: ShopifyCart): Cart {
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

function flattenCartLines(cartLines: ShopifyCartLine[]): ShopifyCartLine[] {
  return cartLines
    .map((cartLine) => {
      const { id, merchandise, quantity } = cartLine;
      return new Array(quantity).fill({ id, merchandise });
    })
    .flat();
}
