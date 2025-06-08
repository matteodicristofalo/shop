import { ShopifyResponse } from "./generics.responses";
import { ShopifyPrice } from "./price.responses";

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
