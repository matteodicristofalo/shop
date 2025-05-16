import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyCollectionResponse } from "@utils/shopify/responses/collections";
import { getId } from "@utils/shopify/services/generics";
import { getBrand, getName } from "@utils/shopify/services/products";
import { Nullable } from "@utils/types";
import { productsInCategoryQuery } from "@utils/shopify/queries/collections";
import { Product } from "@models/product";

type PartialProduct = Omit<
  Product,
  "title" | "description" | "availableForSale" | "variants"
>;

export async function getProductsInCategory(
  id: string
): Promise<Nullable<PartialProduct[]>> {
  const query = productsInCategoryQuery(id);
  const response = await fetchShopify<ShopifyCollectionResponse>(query);

  if (!response) return null;

  const { collection } = response.data;

  if (!collection) return null;

  return collection.products.nodes.map((product) => ({
    id: getId(product.id),
    brand: getBrand(product.title),
    name: getName(product.title),
    price: product.priceRange.minVariantPrice,
    images: product.images.nodes.map((image) => image.src),
  }));
}
