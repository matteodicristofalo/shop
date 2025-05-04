import { cache } from "react";
import { fetchShopify } from "../../utils/shopify/fetch";
import { ProductResponse } from "../../utils/shopify/responses";
import { Nullable } from "@utils/types";

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
    inStock: boolean;
  }[];
};

export const getProduct = cache(
  async (id: string): Promise<Nullable<Product>> => {
    const query = `{
    product(id: "gid://shopify/Product/${id}") {
      id
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 20) {
        nodes {
          src
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
          availableForSale
        }
      }
    }
  }`;

    const response = await fetchShopify<ProductResponse>(query);

    if (!response) return null;

    const { product } = response.data;

    if (!product) return null;

    const title = product.title;
    const brand = getBrand(product.title);
    const name = getName(product.title);
    const description = product.description;
    const price = product.priceRange.minVariantPrice;
    const images = product.images.nodes.map((node) => node.src);
    const variants = product.variants.nodes
      .map((variant) => ({
        id: variant.id,
        title: variant.title,
        inStock: variant.availableForSale,
      }))
      .toSorted((a, b) => a.title.localeCompare(b.title));

    return {
      id,
      title,
      brand,
      name,
      description,
      price,
      images,
      variants,
    };
  }
);

function getBrand(title: string): string {
  const splittedTitle = title.split("-");
  const maybeBrand = splittedTitle.at(0)?.trim();
  return maybeBrand ?? "";
}

function getName(title: string): string {
  const splittedTitle = title.split("-");
  const maybeName = splittedTitle.at(1)?.trim();
  return maybeName ?? "";
}
