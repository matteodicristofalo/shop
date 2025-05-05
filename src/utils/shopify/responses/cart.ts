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
      nodes: CartLine[];
    };
    checkoutUrl: string;
  };
}>;

export type AddToCartResponse = ShopifyResponse<{
  cartLinesAdd: {
    cart: {
      id: string;
      lines: {
        nodes: CartLine[];
      };
      checkoutUrl: string;
    };
  };
}>;

export type CartLine = {
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
};
