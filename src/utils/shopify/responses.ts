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
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    variants: {
      nodes: {
        id: string;
        title: string;
      }[];
    };
  };
}>;

type ShopifyResponse<T> = {
  data: T;
};
