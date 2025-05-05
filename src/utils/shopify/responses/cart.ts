import { ShopifyResponse } from "./generics";

export type ShopifCreateCartResponse = ShopifyResponse<{
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
    };
  };
}>;

export type ShopifGetCartResponse = ShopifyResponse<{
  cart: ShopifyCart;
}>;

export type ShopifAddToCartResponse = ShopifyResponse<{
  cartLinesAdd: {
    cart: ShopifyCart;
  };
}>;

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: {
    nodes: ShopifCartLine[];
  };
};

export type ShopifCartLine = {
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
