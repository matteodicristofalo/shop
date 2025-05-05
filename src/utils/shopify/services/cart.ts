import { CartLine } from "../responses/cart";

export function flattenCartLine(cartLines: CartLine[]): CartLine[] {
  return cartLines
    .map((cartLine) => {
      const { id, merchandise, quantity } = cartLine;
      return new Array(quantity).fill({ id, merchandise });
    })
    .flat();
}
