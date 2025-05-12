import { ShopifyResponse } from "./generics";

export type ShopifyRecommendationsResponse = ShopifyResponse<{
  productRecommendations: {
    id: string;
    title: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      nodes: {
        src: string;
      }[];
    };
  }[];
}>;
