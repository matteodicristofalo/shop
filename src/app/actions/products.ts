import { cache } from "react";
import { fetchShopify } from "../../utils/shopify/fetch";
import { ProductResponse } from "../../utils/shopify/responses";
import { Nullable } from "@/utils/types";

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
  media: string[];
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
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      media(first: 20) {
        edges {
          node {
            ... on MediaImage {
              image {
                url
              }
            }
          }
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
    const price = product.priceRange.maxVariantPrice;
    const media = product.media.edges.map((edge) => edge.node.image.url);
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
      media,
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
