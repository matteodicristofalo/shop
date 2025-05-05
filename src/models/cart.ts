export type Cart = {
  id: string;
  lines: {
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
        image: string;
      };
    };
  }[];
  totalQuantity: number;
  checkoutUrl: string;
};
