import { ShopifyResponse } from "./generics";

export type ShopifyProductResponse = ShopifyResponse<{
  product: {
    id: string;
    title: string;
    description: string;
    availableForSale: boolean;
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
    variants: {
      nodes: {
        id: string;
        title: string;
        availableForSale: boolean;
      }[];
    };
  };
}>;
