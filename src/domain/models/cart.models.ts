import { Price } from "./price.models";

export type Cart = {
  id: string;
  lines: {
    id: string;
    merchandise: {
      id: string;
      title: string;
      price: Price;
      product: {
        id: string;
        slug: string;
        name: string;
        brand: string;
        image: string;
      };
    };
  }[];
  totalAmount: Price;
  totalQuantity: number;
  checkoutUrl: string;
};
