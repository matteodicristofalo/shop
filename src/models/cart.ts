export type Cart = {
  id: string;
  lines: {
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
        name: string;
        brand: string;
        image: string;
      };
    };
  }[];
  totalAmount: {
    amount: string;
    currencyCode: string;
  };
  totalQuantity: number;
  checkoutUrl: string;
};
