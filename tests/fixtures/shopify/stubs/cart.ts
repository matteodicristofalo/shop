import { Product } from "./product";

export function getCart(
  cart: Partial<{
    id: string;
    lines: CartLine[];
  }>
) {
  const cartLines = cart.lines ?? [];

  return {
    id: cart.id ?? "cartId",
    lines: {
      nodes: cartLines,
    },
    cost: {
      totalAmount: getTotalAmount(cartLines),
    },
    totalQuantity: getTotalQuantity(cartLines),
    checkoutUrl: "https://checkout.shopify.com/",
  };
}

function getTotalAmount(lines: CartLine[]): {
  amount: string;
  currencyCode: string;
} {
  const amount = lines.reduce((total, line) => {
    const lineCost = parseFloat(line.merchandise.price.amount) * line.quantity;
    return total + lineCost;
  }, 0);

  return {
    amount: amount.toFixed(2),
    currencyCode: "EUR",
  };
}

function getTotalQuantity(lines: CartLine[]) {
  return lines.reduce((total, line) => total + line.quantity, 0);
}

export function getCartLine(
  product: Product,
  variant: string,
  quantity: number
): CartLine {
  return {
    id: "lineId",
    merchandise: {
      ...getProductVariant(product, variant),
      product: {
        id: product.id,
        title: product.title,
        featuredImage: {
          src: product.images.nodes[0].src,
        },
      },
    },
    quantity,
  };
}

function getProductVariant(product: Product, variantTitle: string) {
  const variant = product.variants.nodes.find((v) => v.title === variantTitle);

  if (!variant) throw new Error("Variant not found");

  return {
    id: variant.id,
    title: variant.title,
    price: {
      amount: product.priceRange.minVariantPrice.amount,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
    },
  };
}

type CartLine = {
  id: string;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      id: string;
      title: string;
      featuredImage: {
        src: string;
      };
    };
  };
  quantity: number;
};
