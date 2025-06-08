import { Price } from "@models/price";
import { ProductPrice } from "@models/product";
import { ShopifyPrice } from "@utils/shopify/responses/price";

export function toProductPrice(
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
