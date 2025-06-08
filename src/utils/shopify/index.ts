import { Nullable } from "@utils/types.utils";
import { post } from "@utils/fetch.utils";

export async function fetchShopify<T>(
  query: string,
  variables: unknown = {}
): Promise<Nullable<T>> {
  const url = process.env.SHOPIFY_BASE_URL || "";
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || "";

  try {
    return await post<T>(
      url,
      { query, variables },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": accessToken,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching Shopify:", error);
    return null;
  }
}
