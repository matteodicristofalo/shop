import { ShopifyCartLine } from "@utils/shopify/responses/cart";

export function flattenCartLines(
  cartLines: ShopifyCartLine[]
): ShopifyCartLine[] {
  return cartLines
    .map((cartLine) => {
      const { id, merchandise, quantity } = cartLine;
      return new Array(quantity).fill({ id, merchandise });
    })
    .flat();
}
