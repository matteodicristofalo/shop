import { cache } from "react";
import { fetchShopify } from "@utils/shopify";
import { ShopifyProductResponse } from "@utils/shopify/responses/products.responses";
import { getBrand, getName } from "@domain/converters/product.converters";
import { Nullable } from "@utils/types.utils";
import { getProductQuery } from "@utils/shopify/queries/products.queries";
import { PartialProduct, Product } from "@domain/models/product.models";
import { productRecommendationsQuery } from "@utils/shopify/queries/recommendations.queries";
import { ShopifyRecommendationsResponse } from "@utils/shopify/responses/recommendations.responses";
import { getId } from "@domain/services/ids.service";
import { sizeComparator } from "@domain/services/sizes.service";
import { getProductPrice } from "@domain/converters/product.converters";

export const getProduct = cache(
  async (id: string): Promise<Nullable<Product>> => {
    const query = getProductQuery(id);
    const response = await fetchShopify<ShopifyProductResponse>(query);

    if (!response) return null;

    const { product } = response.data;

    if (!product) return null;

    return {
      id,
      slug: product.handle,
      title: product.title,
      brand: getBrand(product.title),
      name: getName(product.title),
      description: product.description,
      availableForSale: product.availableForSale,
      price: getProductPrice(product.compareAtPriceRange, product.priceRange),
      images: product.images.nodes.map((node) => node.src),
      variants: product.variants.nodes.toSorted((a, b) =>
        sizeComparator(a.title, b.title)
      ),
    };
  }
);

export async function getProductRecommendations(
  id: string
): Promise<Nullable<PartialProduct[]>> {
  const query = productRecommendationsQuery(id);
  const response = await fetchShopify<ShopifyRecommendationsResponse>(query);

  if (!response) return null;

  const { productRecommendations } = response.data;

  if (!productRecommendations) return null;

  return productRecommendations.map((product) => ({
    id: getId(product.id),
    slug: product.handle,
    brand: getBrand(product.title),
    name: getName(product.title),
    price: getProductPrice(product.compareAtPriceRange, product.priceRange),
    images: product.images.nodes.map((node) => node.src),
  }));
}
