import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyCollectionResponse } from "@utils/shopify/responses/collections";
import { getId } from "@utils/shopify/services/generics";
import { getBrand, getName } from "@utils/shopify/services/products";
import { Nullable } from "@utils/types";
import { productsInCollectionQuery } from "@utils/shopify/queries/collections";

type Collection = {
  products: Product[];
};

type Product = {
  id: string;
  title: string;
  brand: string;
  name: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  images: string[];
};

export async function getCollection(id: string): Promise<Nullable<Collection>> {
  const query = productsInCollectionQuery(id);
  const response = await fetchShopify<ShopifyCollectionResponse>(query);

  if (!response) return null;

  const { collection } = response.data;

  if (!collection) return null;

  return {
    products: collection.products.nodes.map((product) => ({
      id: getId(product.id),
      title: product.title,
      brand: getBrand(product.title),
      name: getName(product.title),
      price: product.priceRange.minVariantPrice,
      images: product.images.nodes.map((image) => image.src),
    })),
  };
}
