import { ShopifyResponse } from "./generics.responses";

export type ShopifyCreateCartResponse = ShopifyResponse<{
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      cost: ShopifyCartCost;
    };
  };
}>;

export type ShopifyGetCartResponse = ShopifyResponse<{
  cart: ShopifyCart;
}>;

export type ShopifyAddToCartResponse = ShopifyResponse<{
  cartLinesAdd: {
    cart: ShopifyCart;
  };
}>;

export type ShopifyRemoveFromCartResponse = ShopifyResponse<{
  cartLinesUpdate: {
    cart: ShopifyCart;
  };
}>;

type ShopifyCartCost = {
  totalAmount: {
    amount: string;
    currencyCode: string;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: ShopifyCartCost;
  lines: {
    nodes: ShopifyCartLine[];
  };
};

export type ShopifyCartLine = {
  id: string;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: {
        src: string;
      };
    };
  };
  quantity: number;
};
