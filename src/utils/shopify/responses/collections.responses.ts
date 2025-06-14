import { ShopifyResponse } from "./generics.responses";
import { ShopifyPrice } from "./price.responses";

export type ShopifyCollectionResponse = ShopifyResponse<{
  collection: {
    title: string;
    products: {
      nodes: {
        id: string;
        handle: string;
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
