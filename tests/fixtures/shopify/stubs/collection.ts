import { PartialProduct as Product } from "./product";

export function collection(products: Product[]) {
  return {
    collection: {
      products: {
        nodes: [...products],
      },
    },
  };
}
