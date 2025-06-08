import { ShopifyResponse } from "./generics.responses";
import { ShopifyPrice } from "./price.responses";

export type ShopifyProductResponse = ShopifyResponse<{
  product: {
    id: string;
    title: string;
    description: string;
    availableForSale: boolean;
    priceRange: ShopifyPrice;
    compareAtPriceRange: ShopifyPrice;
    images: {
      nodes: {
        src: string;
      }[];
    };
    variants: {
      nodes: {
        id: string;
        title: string;
        availableForSale: boolean;
      }[];
    };
  };
}>;
