import { PartialProduct as Product } from "./product";

export function getCollection(products: Product[]) {
  return {
    collection: {
      products: {
        nodes: [...products],
      },
    },
  };
}
