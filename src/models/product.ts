export type Product = {
  id: string;
  title: string;
  brand: string;
  name: string;
  description: string;
  availableForSale: boolean;
  price: Price;
  images: string[];
  variants: Variant[];
};

export type Price = {
  amount: string;
  currencyCode: string;
};

export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
};
