import { Nullable } from "../types";

export async function fetchShopify<T>(query: string): Promise<Nullable<T>> {
  const url = process.env.SHOPIFY_BASE_URL || "";
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || "";

  try {
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken,
      },
      body: JSON.stringify({
        query,
      }),
    });

    if (response.ok) {
      return response.json() as Promise<T>;
    }

    console.error("Failed to fetch Shopify:", response);
  } catch (error) {
    console.error("Error fetching Shopify:", error);
  }

  return null;
}
