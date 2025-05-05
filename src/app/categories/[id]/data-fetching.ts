import { fetchShopify } from "@utils/shopify/fetch";
import { ShopifyCollectionResponse } from "@utils/shopify/responses/collections";
import { getBrand, getId, getName } from "@utils/shopify/services/products";
import { getCategoryById } from "@utils/shopify/services/categories";
import { Nullable } from "@utils/types";
import { productsInCollectionQuery } from "@utils/shopify/queries/collections";

type Category = {
  name: string;
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
  image: string;
};

export async function getCategory(id: string): Promise<Nullable<Category>> {
  const category = getCategoryById(id);

  if (!category) return null;

  const query = productsInCollectionQuery(category.id);
  const response = await fetchShopify<ShopifyCollectionResponse>(query);

  if (!response) return null;

  const { collection } = response.data;

  if (!collection) return null;

  return {
    name: category.name,
    products: collection.products.nodes.map((product) => ({
      id: getId(product.id),
      title: product.title,
      brand: getBrand(product.title),
      name: getName(product.title),
      price: product.priceRange.minVariantPrice,
      image: product.featuredImage.src,
    })),
  };
}
