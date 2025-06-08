import { Price } from "./price.models";

export type Product = {
  id: string;
  title: string;
  brand: string;
  name: string;
  description: string;
  availableForSale: boolean;
  price: ProductPrice;
  images: string[];
  variants: Variant[];
};

export type ProductPrice = {
  original: Price;
  discounted?: Price;
};

export type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
};
