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
        name: string;
        brand: string;
        image: string;
      };
    };
  }[];
  totalQuantity: number;
  checkoutUrl: string;
};
