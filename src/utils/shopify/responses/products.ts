import { ShopifyResponse } from "./generics";
import { ShopifyPrice } from "./price";

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
