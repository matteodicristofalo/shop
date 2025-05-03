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
    media: {
      edges: {
        node: {
          image: {
            url: string;
          };
        };
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
