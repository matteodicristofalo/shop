import { ShopifyResponse } from "./generics";
import { ShopifyPrice } from "./price";

export type ShopifyRecommendationsResponse = ShopifyResponse<{
  productRecommendations: {
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
}>;
