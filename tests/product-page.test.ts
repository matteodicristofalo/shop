import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { Request } from "./fixtures/shopify/types";
import {
  getPartialProduct as getRecommendedProduct,
  getProduct,
} from "./fixtures/shopify/stubs/product";

test("redirect to 404 when product not found", async ({
  page,
  next,
  shopify,
}) => {
  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: { data: { product: null } },
    },
  });

  const response = await page.goto(
    `http://localhost:${next.port}/products/slug/1234567890`
  );

  expect(response?.status()).toBe(404);
  expect(response?.url()).toBe(`http://localhost:${next.port}/404`);
});

[400, 401, 404, 408, 500].forEach((status) => {
  test(`redirect to 404 when product call returns ${status}`, async ({
    page,
    next,
    shopify,
  }) => {
    shopify.stub({
      request: Request.PRODUCT,
      response: {
        status,
      },
    });

    const response = await page.goto(
      `http://localhost:${next.port}/products/slug/1234567890`
    );

    expect(response?.status()).toBe(404);
    expect(response?.url()).toBe(`http://localhost:${next.port}/404`);
  });
});

[400, 401, 404, 408, 500].forEach((status) => {
  test(`show the page even if product recommendations call fails with ${status}`, async ({
    page,
    next,
    shopify,
  }) => {
    const product = getProduct({
      id: "gid://shopify/Product/1234567890",
    });

    shopify.stub([
      {
        request: Request.PRODUCT,
        response: {
          payload: {
            data: {
              product,
            },
          },
        },
      },
      {
        request: Request.PRODUCT_RECOMMENDATIONS,
        response: {
          status,
        },
      },
    ]);

    const response = await page.goto(
      `http://localhost:${next.port}/products/${product.handle}/1234567890`
    );
    expect(response?.status()).toBe(200);
  });
});

test(`redirect to a url having the right slug`, async ({
  page,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    title: "New Balance - 990v4",
    slug: "new-balance-990v4",
  });

  shopify.stub([
    {
      request: Request.PRODUCT,
      response: {
        payload: {
          data: {
            product,
          },
        },
      },
    },
  ]);

  const response = await page.goto(
    `http://localhost:${next.port}/products/wrong-slug/1234567890`
  );
  expect(response?.status()).toBe(200);
});

test("page title as product name", async ({ page, next, shopify }) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    title: "New Balance - 991v2",
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });
  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const title = await page.title();
  expect(title).toEqual(product.title);
});

test("page description as product description", async ({
  page,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const description = await page
    .locator('meta[name="description"]')
    .getAttribute("content");

  expect(description).toEqual(product.description);
});

test("render product brand and name", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    title: "New Balance - 991v2",
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productBrand, productName } = pageObjects.productPage;
  await expect(productBrand).toBeVisible();
  await expect(productBrand).toHaveText("New Balance");
  await expect(productName).toBeVisible();
  await expect(productName).toHaveText("991v2");
});

test("render product price", async ({ page, pageObjects, next, shopify }) => {
  const price = {
    amount: "110.0",
    currencyCode: "EUR",
  };

  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    price,
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productPrice } = pageObjects.productPage;

  await expect(productPrice).toBeVisible();
  await expect(productPrice).toHaveText(
    `${price.amount} ${price.currencyCode}`
  );
});

test("render product with disocunted price", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const price = {
    amount: "110.0",
    currencyCode: "EUR",
  };

  const discountedPrice = {
    amount: "90.0",
    currencyCode: "EUR",
  };

  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    price,
    discountedPrice,
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productPrice, productDiscountedPrice } = pageObjects.productPage;

  await expect(productPrice).toBeVisible();
  await expect(productPrice).toHaveText(
    `${price.amount} ${price.currencyCode}`
  );
  await expect(productPrice).toHaveCSS("text-decoration", /line-through/);

  await expect(productDiscountedPrice).toBeVisible();
  await expect(productDiscountedPrice).toHaveText(
    `${discountedPrice.amount} ${discountedPrice.currencyCode}`
  );
});

test("render product description", async ({ page, next, shopify }) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const description = page.getByText(product.description);
  await expect(description).toBeVisible();
});

test("render product images", async ({ page, pageObjects, next, shopify }) => {
  const image1 = "https://mydomain.shopify.com/media/image1.jpg";
  const image2 = "https://mydomain.shopify.com/media/image2.jpg";

  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    title: "New Balance - 991v2",
    images: [image1, image2],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productImages } = pageObjects.productPage;

  await expect(productImages.nth(0)).toBeVisible();
  await expect(productImages.nth(0)).toHaveAttribute("src", image1);
  await expect(productImages.nth(0)).toHaveAttribute("alt", product.title);

  await expect(productImages.nth(1)).toBeVisible();
  await expect(productImages.nth(1)).toHaveAttribute("src", image2);
  await expect(productImages.nth(1)).toHaveAttribute("alt", product.title);
});

test("don't render size selector when unique size product", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { sizeSelector } = pageObjects.productPage;
  await expect(sizeSelector).not.toBeAttached();
});

test("render add to cart when a unique size product is available for sale", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    availableForSale: true,
    variants: [
      {
        title: "Taglia unica",
        availableForSale: true,
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { addToCartButton } = pageObjects.productPage;
  await expect(addToCartButton).toBeVisible();
  await expect(addToCartButton).toBeEnabled();
});

test("render sold out when a unique size product is not available for sale", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    availableForSale: false,
    variants: [
      {
        title: "Taglia unica",
        availableForSale: false,
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { soldOutButton } = pageObjects.productPage;
  await expect(soldOutButton).toBeVisible();
  await expect(soldOutButton).toBeDisabled();
});

test("render size selector when multi size product", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [
      {
        title: "S",
      },
      {
        title: "M",
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { sizeSelector } = pageObjects.productPage;
  await expect(sizeSelector).toBeVisible();
});

test("render add to cart when multi size product has any size available for sale", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    availableForSale: true,
    variants: [
      {
        title: "S",
        availableForSale: true,
      },
      {
        title: "M",
        availableForSale: false,
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { addToCartButton } = pageObjects.productPage;
  await expect(addToCartButton).toBeVisible();
  await expect(addToCartButton).toBeEnabled();
});

test("render sold out when multi size product doesn't have any size available for sale", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    availableForSale: false,
    variants: [
      {
        title: "S",
        availableForSale: false,
      },
      {
        title: "M",
        availableForSale: false,
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { soldOutButton } = pageObjects.productPage;
  await expect(soldOutButton).toBeVisible();
  await expect(soldOutButton).toBeDisabled();
});

test("render select size when trying to add to cart without having selected a size", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [
      {
        title: "S",
      },
      {
        title: "M",
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { addToCartButton, selectSizeButton } = pageObjects.productPage;

  await addToCartButton.click();

  await expect(selectSizeButton).toBeVisible();
});

test("numeric sizes ordering", async ({ page, pageObjects, next, shopify }) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [
      {
        id: "gid://shopify/ProductVariant/2345678901",
        title: "42",
      },
      {
        id: "gid://shopify/ProductVariant/4567890123",
        title: "41",
      },
      {
        id: "gid://shopify/ProductVariant/5678901234",
        title: "41.5",
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { sizes } = pageObjects.productPage;

  await expect(sizes.nth(0)).toHaveAccessibleName("41");
  await expect(sizes.nth(1)).toHaveAccessibleName("41.5");
  await expect(sizes.nth(2)).toHaveAccessibleName("42");
});

test("not numeric sizes ordering", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [
      {
        id: "gid://shopify/ProductVariant/1234567890",
        title: "XXL",
      },
      {
        id: "gid://shopify/ProductVariant/2345678901",
        title: "M",
      },
      {
        id: "gid://shopify/ProductVariant/3456789012",
        title: "XL",
      },
      {
        id: "gid://shopify/ProductVariant/4567890123",
        title: "XS",
      },
      {
        id: "gid://shopify/ProductVariant/5678901234",
        title: "L",
      },
      {
        id: "gid://shopify/ProductVariant/6789012345",
        title: "S",
      },
    ],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { sizes } = pageObjects.productPage;

  await expect(sizes.nth(0)).toHaveAccessibleName("XS");
  await expect(sizes.nth(1)).toHaveAccessibleName("S");
  await expect(sizes.nth(2)).toHaveAccessibleName("M");
  await expect(sizes.nth(3)).toHaveAccessibleName("L");
  await expect(sizes.nth(4)).toHaveAccessibleName("XL");
  await expect(sizes.nth(5)).toHaveAccessibleName("XXL");
});

test("can select available for sale sizes", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const availableForSaleVariant = {
    title: "S",
    availableForSale: true,
  };

  const notAvailableForSaleVariant = {
    title: "M",
    availableForSale: false,
  };

  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [availableForSaleVariant, notAvailableForSaleVariant],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { sizeSelector } = pageObjects.productPage;

  const availableForSaleSize = sizeSelector.getByText(
    availableForSaleVariant.title,
    {
      exact: true,
    }
  );
  await availableForSaleSize.click();
  await expect(availableForSaleSize).toHaveCSS(
    "background-color",
    "rgb(26, 24, 24)"
  );
});

test("cannot select not available for sale sizes", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const availableForSaleVariant = {
    id: "gid://shopify/ProductVariant/2345678901",
    title: "S",
    availableForSale: true,
  };

  const notAvailableForSaleVariant = {
    id: "gid://shopify/ProductVariant/3456789012",
    title: "M",
    availableForSale: false,
  };

  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
    variants: [availableForSaleVariant, notAvailableForSaleVariant],
  });

  shopify.stub({
    request: Request.PRODUCT,
    response: {
      payload: {
        data: {
          product,
        },
      },
    },
  });

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { sizeSelector } = pageObjects.productPage;

  const notAvailableForSaleSize = sizeSelector.getByText(
    notAvailableForSaleVariant.title,
    {
      exact: true,
    }
  );
  await expect(notAvailableForSaleSize).toBeDisabled();
});

test("show product recommendations", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
  });

  const recommendedProduct1 = getRecommendedProduct({
    id: "gid://shopify/Product/12345678901",
    title: "New Balance - 991v2",
    slug: "new-balance-991v2",
    price: {
      amount: "100.0",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/product-1.jpg"],
  });

  const recommendedProduct2 = getRecommendedProduct({
    id: "gid://shopify/Product/12345678902",
    title: "New Balance - 550",
    slug: "new-balance-550",
    price: {
      amount: "110.0",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/product-2.jpg"],
  });

  const recommendedProducts = [recommendedProduct1, recommendedProduct2];

  shopify.stub([
    {
      request: Request.PRODUCT,
      response: {
        payload: {
          data: {
            product: product,
          },
        },
      },
    },
    {
      request: Request.PRODUCT_RECOMMENDATIONS,
      response: {
        payload: {
          data: {
            productRecommendations: recommendedProducts,
          },
        },
      },
    },
  ]);

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productRecommendations, productRecommendationsItems } =
    pageObjects.productPage;

  const productRecommendationsHeading = productRecommendations.getByRole(
    "heading",
    { level: 2 }
  );
  await expect(productRecommendationsHeading).toBeVisible();
  await expect(productRecommendationsHeading).toHaveText(
    "Prodotti consigliati"
  );

  await expect(productRecommendationsItems).toHaveCount(2);
  recommendedProducts.forEach(async (product, i) => {
    const productCard = productRecommendationsItems.nth(i);
    await expect(productCard).toBeVisible();

    const link = productCard.getByRole("link");
    const id = product.id.split("/").pop();
    await expect(link).toHaveAttribute(
      "href",
      `/products/${product.handle}/${id}`
    );

    const image = productCard.getByRole("img");
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("src", product.images.nodes[0].src);

    const [productBrand, productName] = product.title.split("-");
    await expect(productCard.getByText(productBrand)).toBeVisible();
    await expect(productCard.getByText(productName)).toBeVisible();

    const { amount, currencyCode } = product.price;
    await expect(
      productCard.getByText(`${amount} ${currencyCode}`)
    ).toBeVisible();
  });
});

test("show product recommendations with discounted price", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
  });

  const price = {
    amount: "110.0",
    currencyCode: "EUR",
  };

  const discountedPrice = {
    amount: "90.0",
    currencyCode: "EUR",
  };

  const recommendedProduct = getRecommendedProduct({
    id: "gid://shopify/Product/12345678901",
    title: "New Balance - 991v2",
    images: ["https://mydomain.shopify.com/media/product-1.jpg"],
    price,
    discountedPrice,
  });

  shopify.stub([
    {
      request: Request.PRODUCT,
      response: {
        payload: {
          data: {
            product: product,
          },
        },
      },
    },
    {
      request: Request.PRODUCT_RECOMMENDATIONS,
      response: {
        payload: {
          data: {
            productRecommendations: [recommendedProduct],
          },
        },
      },
    },
  ]);

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productRecommendationsItems } = pageObjects.productPage;

  const productCard = productRecommendationsItems.nth(0);

  const priceLocator = productCard.getByText(
    `${price.amount} ${price.currencyCode}`
  );
  await expect(priceLocator).toBeVisible();
  await expect(priceLocator).toHaveCSS("text-decoration", /line-through/);

  const discountedPriceLocator = productCard.getByText(
    `${price.amount} ${price.currencyCode}`
  );
  await expect(discountedPriceLocator).toBeVisible();
});

test("do not show product recommendations when no recommendations", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/1234567890",
  });

  shopify.stub([
    {
      request: Request.PRODUCT,
      response: {
        payload: {
          data: {
            product: product,
          },
        },
      },
    },
    {
      request: Request.PRODUCT_RECOMMENDATIONS,
      response: {
        payload: {
          data: {
            productRecommendations: [],
          },
        },
      },
    },
  ]);

  await page.goto(
    `http://localhost:${next.port}/products/${product.handle}/1234567890`
  );

  const { productRecommendations } = pageObjects.productPage;

  await expect(productRecommendations).not.toBeAttached();
});
