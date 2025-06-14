export function getProduct(
  attribues: Partial<{
    id: string;
    slug: string;
    title: string;
    description: string;
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
    discountedPrice: {
      amount: string;
      currencyCode: string;
    };
    images: string[];
    variants: Partial<{
      id: string;
      title: string;
      availableForSale: boolean;
    }>[];
  }>
): Product {
  const images = attribues.images ?? [DEFAULTS.image];
  const variants = attribues.variants ?? [DEFAULTS.variant];
  const price = attribues.price ?? DEFAULTS.price;
  const discountedPrice = attribues.discountedPrice ?? price;

  return {
    id: attribues.id ?? DEFAULTS.id,
    handle: attribues.slug ?? DEFAULTS.slug,
    title: attribues.title ?? DEFAULTS.title,
    description: attribues.description ?? DEFAULTS.description,
    availableForSale: attribues.availableForSale ?? true,
    priceRange: {
      minVariantPrice: discountedPrice,
      maxVariantPrice: discountedPrice,
    },
    compareAtPriceRange: {
      minVariantPrice: price,
      maxVariantPrice: price,
    },
    price: discountedPrice,
    images: {
      nodes: getImages(images),
    },
    variants: {
      nodes: getVariants(variants),
    },
  };
}

function getImages(images: string[]): { src: string }[] {
  return images.map((src) => ({ src }));
}

function getVariants(
  variants: Partial<{
    id: string;
    title: string;
    availableForSale: boolean;
  }>[]
) {
  return variants.map((variant) => ({
    ...DEFAULTS.variant,
    ...variant,
  }));
}

export function getPartialProduct(
  attribues: Partial<{
    id: string;
    slug: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    discountedPrice: {
      amount: string;
      currencyCode: string;
    };
    images: string[];
  }>
): PartialProduct {
  const images = attribues.images ?? [DEFAULTS.image];
  const price = attribues.price ?? DEFAULTS.price;
  const discountedPrice = attribues.discountedPrice ?? price;

  return {
    id: attribues.id ?? DEFAULTS.id,
    handle: attribues.slug ?? DEFAULTS.slug,
    title: attribues.title ?? DEFAULTS.title,
    priceRange: {
      minVariantPrice: discountedPrice,
      maxVariantPrice: discountedPrice,
    },
    compareAtPriceRange: {
      minVariantPrice: price,
      maxVariantPrice: price,
    },
    price: discountedPrice,
    images: {
      nodes: getImages(images),
    },
  };
}

const DEFAULTS = {
  id: "gid://shopify/Product/1234567890",
  slug: "new-balance-991v2",
  title: "New Balance - 991v2",
  description: "Lorem ipsum dolor sit amet",
  image: "https://mydomain.shopify.com/media/image.jpg",
  price: {
    amount: "250.0",
    currencyCode: "EUR",
  },
  variant: {
    id: "gid://shopify/ProductVariant/1234567890",
    title: "Taglia unica",
    availableForSale: true,
  },
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  // Just to improve the readibility of the tests
  price: {
    amount: string;
    currencyCode: string;
  };
  images: {
    nodes: {
      src: string;
    }[];
  };
  variants: {
    nodes: {
      id: string;
      title: string;
      availableForSale: boolean;
    }[];
  };
};

export type PartialProduct = {
  id: string;
  handle: string;
  title: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  // Just to improve the readibility of the tests
  price: {
    amount: string;
    currencyCode: string;
  };
  images: {
    nodes: {
      src: string;
    }[];
  };
};
