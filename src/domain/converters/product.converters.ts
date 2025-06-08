import { Price } from "@domain/models/price.models";
import { ProductPrice } from "@domain/models/product.models";
import { ShopifyPrice } from "@utils/shopify/responses/price.responses";

export function getBrand(title: string): string {
  const splittedTitle = title.split("-");
  const maybeBrand = splittedTitle.at(0)?.trim();
  return maybeBrand ?? "";
}

export function getName(title: string): string {
  const splittedTitle = title.split("-");
  const maybeName = splittedTitle.at(1)?.trim();
  return maybeName ?? "";
}

export function getProductPrice(
  compareAtPriceRange: ShopifyPrice,
  priceRange: ShopifyPrice
): ProductPrice {
  const originalPrice = getPrice(compareAtPriceRange);
  const possibleDiscountedPrice = getPrice(priceRange);

  if (Number(possibleDiscountedPrice.amount) === Number(originalPrice.amount)) {
    return {
      original: originalPrice,
    };
  }

  if (Number(possibleDiscountedPrice.amount) < Number(originalPrice.amount)) {
    return {
      original: originalPrice,
      discounted: possibleDiscountedPrice,
    };
  }

  console.warn(
    "Price misconfiguration: original price is lower than discounted price"
  );

  return {
    original: possibleDiscountedPrice,
  };
}

function getPrice(price: ShopifyPrice): Price {
  const { minVariantPrice, maxVariantPrice } = price;

  if (minVariantPrice.amount !== maxVariantPrice.amount) {
    console.warn("Price misconfiguration: min and max variant prices differ");
  }

  return maxVariantPrice;
}
