import { cache } from "react";
import { fetchShopify } from "@utils/shopify";
import { ShopifyCollectionResponse } from "@utils/shopify/responses/collections.responses";
import { getId } from "@domain/services/ids.service";
import { getBrand, getName } from "@domain/converters/product.converters";
import { Nullable } from "@utils/types.utils";
import { collectionQuery } from "@utils/shopify/queries/collections.queries";
import { PartialProduct } from "@domain/models/product.models";
import { getProductPrice } from "@domain/converters/product.converters";

type Collection = {
  title: string;
  products: PartialProduct[];
};

export const getCollection = cache(
  async (slug: string): Promise<Nullable<Collection>> => {
    const query = collectionQuery(slug);
    const response = await fetchShopify<ShopifyCollectionResponse>(query);

    if (!response) return null;

    const { collection } = response.data;

    if (!collection) return null;

    return {
      title: collection.title,
      products: collection.products.nodes.map((product) => ({
        id: getId(product.id),
        slug: product.handle,
        brand: getBrand(product.title),
        name: getName(product.title),
        price: getProductPrice(product.compareAtPriceRange, product.priceRange),
        images: product.images.nodes.map((image) => image.src),
      })),
    };
  }
);
