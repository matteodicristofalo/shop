import { cache } from "react";
import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyProductResponse } from "@utils/shopify/responses/products";
import { getBrand, getName } from "@utils/shopify/services/products";
import { Nullable } from "@utils/types";
import { getProductQuery } from "@utils/shopify/queries/products";
import { Product } from "@models/product";
import { productRecommendationsQuery } from "@utils/shopify/queries/recommendations";
import { ShopifyRecommendationsResponse } from "@utils/shopify/responses/recommendations";
import { getId } from "@utils/shopify/services/generics";
import { sizeComparator } from "@utils/sizes";

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
      availableForSale: product.availableForSale,
      price: product.priceRange.minVariantPrice,
      images: product.images.nodes.map((node) => node.src),
      variants: product.variants.nodes.toSorted((a, b) =>
        sizeComparator(a.title, b.title)
      ),
    };
  }
);

type ProductRecommendation = Omit<
  Product,
  "title" | "description" | "availableForSale" | "variants"
>;

export async function getProductRecommendations(
  id: string
): Promise<Nullable<ProductRecommendation[]>> {
  const query = productRecommendationsQuery(id);
  const response = await fetchShopify<ShopifyRecommendationsResponse>(query);

  if (!response) return null;

  const { productRecommendations } = response.data;

  if (!productRecommendations) return null;

  return productRecommendations.map((product) => ({
    id: getId(product.id),
    brand: getBrand(product.title),
    name: getName(product.title),
    price: product.priceRange.minVariantPrice,
    images: product.images.nodes.map((node) => node.src),
  }));
}
