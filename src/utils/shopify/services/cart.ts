import { ShopifCartLine } from "../responses/cart";

export function flattenCartLines(
  cartLines: ShopifCartLine[]
): ShopifCartLine[] {
  return cartLines
    .map((cartLine) => {
      const { id, merchandise, quantity } = cartLine;
      return new Array(quantity).fill({ id, merchandise });
    })
    .flat();
}
