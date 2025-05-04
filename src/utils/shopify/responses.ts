export type ProductResponse = ShopifyResponse<{
  product: {
    id: string;
    title: string;
    description: string;
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

type ShopifyResponse<T> = {
  data: T;
};
