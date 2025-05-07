import { cache } from "react";
import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyProductResponse } from "@utils/shopify/responses/products";
import { getBrand, getName } from "@utils/shopify/services/products";
import { Nullable } from "@utils/types";
import { getProductQuery } from "@utils/shopify/queries/products";

type Product = {
  id: string;
  title: string;
  brand: string;
  name: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  images: string[];
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
  }[];
};

export const getProduct = cache(
  async (id: string): Promise<Nullable<Product>> => {
    const query = getProductQuery(id);
    const response = await fetchShopify<ShopifyProductResponse>(query);

    if (!response) return null;

    const { product } = response.data;

    if (!product) return null;

    return {
      id,
      title: product.title,
      brand: getBrand(product.title),
      name: getName(product.title),
      description: product.description,
      price: product.priceRange.minVariantPrice,
      images: product.images.nodes.map((node) => node.src),
      variants: product.variants.nodes.toSorted((a, b) =>
        a.title.localeCompare(b.title)
      ),
    };
  }
);
