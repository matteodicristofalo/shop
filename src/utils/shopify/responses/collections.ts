import { ShopifyResponse } from "./generics";

export type CollectionResponse = ShopifyResponse<{
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
        featuredImage: {
          src: string;
        };
      }[];
    };
  };
}>;
