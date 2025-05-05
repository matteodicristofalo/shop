import { ShopifyResponse } from "./generics";

export type ShopifCreateCartResponse = ShopifyResponse<{
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      cost: ShopifyCartCost;
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
