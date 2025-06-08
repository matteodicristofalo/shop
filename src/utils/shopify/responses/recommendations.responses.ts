import { ShopifyResponse } from "./generics.responses";
import { ShopifyPrice } from "./price.responses";

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
