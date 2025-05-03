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

type ShopifyResponse<T> = {
  data: T;
};
