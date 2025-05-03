import { fetchShopify } from "../../utils/shopify/fetch";
import { ProductResponse } from "../../utils/shopify/responses";

type Product = {
  id: string;
  brand: string;
  name: string;
  description: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  variants: {
    id: string;
    title: string;
  }[];
};

export async function getProduct(id: string): Promise<Product | null> {
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
      variants(first: 20) {
        nodes {
          id
          title
        }
      }
    }
  }`;

  const response = await fetchShopify<ProductResponse>(query);

  if (!response) return null;

  const { product } = response.data;

  const brand = getBrand(product.title);
  const name = getName(product.title);
  const description = product.description;
  const price = product.priceRange.maxVariantPrice;
  const variants = product.variants.nodes
    .map((variant) => variant)
    .toSorted((a, b) => a.title.localeCompare(b.title));

  return {
    id,
    brand,
    name,
    description,
    price,
    variants,
  };
}

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
