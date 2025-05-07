import { ShopifyResponse } from "./generics";

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
      title: string;
      featuredImage: {
        src: string;
      };
    };
  };
  quantity: number;
};
