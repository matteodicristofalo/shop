import { fetchShopify } from "../../utils/shopify/fetch";
import { CollectionResponse } from "../../utils/shopify/responses";
import { Nullable } from "@utils/types";

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

export async function getProductsInCategory(): Promise<Nullable<Product[]>> {
  const query = `
      {
        collection(id: "gid://shopify/Collection/639477383501") {
          products(first: 10, filters: {category: { id: "aa-8" } }) {
            nodes {
              id
              title
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              featuredImage {
                src
              }
            }
          }
        }
      }
    `;

  const response = await fetchShopify<CollectionResponse>(query);

  if (!response) return null;

  const { collection } = response.data;

  if (!collection) return null;

  return collection.products.nodes.map((product) => ({
    id: product.id,
    title: product.title,
    brand: getBrand(product.title),
    name: getName(product.title),
    price: product.priceRange.minVariantPrice,
    image: product.featuredImage.src,
  }));
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
