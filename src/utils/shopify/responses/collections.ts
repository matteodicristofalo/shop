import { ShopifyResponse } from "./generics";

export type ShopifyCollectionResponse = ShopifyResponse<{
  collection: {
    products: {
      nodes: {
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
    };
  };
}>;
