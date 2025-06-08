import { fetchShopify } from "@utils/shopify";
import { ShopifyCollectionResponse } from "@utils/shopify/responses/collections.responses";
import { getId } from "@domain/services/ids.service";
import { getBrand, getName } from "@domain/converters/product.converters";
import { Nullable } from "@utils/types.utils";
import { productsInCategoryQuery } from "@utils/shopify/queries/collections.queries";
import { Product } from "@domain/models/product.models";
import { getProductPrice } from "@domain/converters/product.converters";

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
    price: getProductPrice(product.compareAtPriceRange, product.priceRange),
    images: product.images.nodes.map((image) => image.src),
  }));
}
