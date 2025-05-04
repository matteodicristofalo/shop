import { ShopifyResponse } from "./generics";

export type CreateCartResponse = ShopifyResponse<{
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    };
  };
}>;

export type GetCartResponse = ShopifyResponse<{
  cart: {
    id: string;
    lines: {
      nodes: {
        id: string;
        merchandise: {
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          product: {
            id: string;
            title: string;
            featuredImage: {
              src: string;
            };
          };
        };
        quantity: number;
      }[];
    };
    totalQuantity: number;
    checkoutUrl: string;
  };
}>;
