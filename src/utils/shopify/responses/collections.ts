import { ShopifyResponse } from "./generics";
import { ShopifyPrice } from "./price";

export type ShopifyCollectionResponse = ShopifyResponse<{
  collection: {
    products: {
      nodes: {
        id: string;
        title: string;
        priceRange: ShopifyPrice;
        compareAtPriceRange: ShopifyPrice;
        images: {
          nodes: {
            src: string;
          }[];
        };
      }[];
    };
  };
}>;
