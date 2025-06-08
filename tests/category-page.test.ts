import { collection } from "./fixtures/shopify/stubs/collection";
import { getPartialProduct as getProduct } from "./fixtures/shopify/stubs/product";
import { Request } from "./fixtures/shopify/types";
import { test } from "./fixtures";
import { expect } from "@playwright/test";

test("redirect to 404 when category not found", async ({ page, next }) => {
  const notExistingCategoryId = "not-existing-category-id";

  const response = await page.goto(
    `http://localhost:${next.port}/categories/${notExistingCategoryId}`
  );

  expect(response?.status()).toBe(404);
  expect(response?.url()).toBe(`http://localhost:${next.port}/404`);
});

test("page title as category name", async ({ page, next }) => {
  const category = {
    name: "Abbigliamento",
    id: "aa-1",
  };

  await page.goto(`http://localhost:${next.port}/categories/${category.id}`);

  const title = await page.title();
  expect(title).toEqual(category.name);
});

test("first level category breadcrumbs", async ({
  page,
  pageObjects,
  next,
}) => {
  const firstLevelCategory = {
    id: "aa-1",
    name: "Abbigliamento",
  };

  await page.goto(
    `http://localhost:${next.port}/categories/${firstLevelCategory.id}`
  );

  const { breadcrumbs, breadcrumbsItems } = pageObjects.categoryPage;

  await expect(breadcrumbs).toBeVisible();
  await expect(breadcrumbsItems).toHaveCount(1);

  const firstLevelCategoryLink = breadcrumbsItems.first().getByRole("link");
  await expect(firstLevelCategoryLink).toBeVisible();
  await expect(firstLevelCategoryLink).toHaveText(firstLevelCategory.name);
  await expect(firstLevelCategoryLink).toBeVisible();
  await expect(firstLevelCategoryLink).toHaveAttribute(
    "href",
    `/categories/${firstLevelCategory.id}`
  );
});

test("second level category breadcrumbs", async ({
  page,
  pageObjects,
  next,
}) => {
  const firstLevelCategory = {
    name: "Abbigliamento",
    id: "aa-1",
  };

  const secondLevelCategory = {
    name: "Outwear",
    id: "aa-1-10",
  };

  await page.goto(
    `http://localhost:${next.port}/categories/${secondLevelCategory.id}`
  );

  const { breadcrumbs, breadcrumbsItems } = pageObjects.categoryPage;

  await expect(breadcrumbs).toBeVisible();
  await expect(breadcrumbsItems).toHaveCount(2);

  const firstLevelCategoryLink = breadcrumbsItems.nth(0).getByRole("link");
  await expect(firstLevelCategoryLink).toBeVisible();
  await expect(firstLevelCategoryLink).toHaveText(
    `${firstLevelCategory.name},`
  );
  await expect(firstLevelCategoryLink).toHaveAttribute(
    "href",
    `/categories/${firstLevelCategory.id}`
  );

  const secondLevelCategoryLink = breadcrumbsItems.nth(1).getByRole("link");
  await expect(secondLevelCategoryLink).toBeVisible();
  await expect(secondLevelCategoryLink).toHaveText(secondLevelCategory.name);
  await expect(secondLevelCategoryLink).toHaveAttribute(
    "href",
    `/categories/${secondLevelCategory.id}`
  );
});

test("render products in grid", async ({
  page,
  next,
  pageObjects,
  shopify,
}) => {
  const product1 = getProduct({
    id: "gid://shopify/Product/1",
    title: "Brand 1 - Product 1",
    price: {
      amount: "110.0",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/product-1.jpg"],
  });

  const product2 = getProduct({
    id: "gid://shopify/Product/2",
    title: "Brand 2 - Product 2",
    price: {
      amount: "120.0",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/product-2.jpg"],
  });

  const products = [product1, product2];

  shopify.stub({
    request: Request.PRODUCTS_IN_CATEGORY,
    response: {
      status: 200,
      payload: {
        data: collection(products),
      },
    },
  });

  await page.goto(`http://localhost:${next.port}/categories/aa-1`);

  const { productsGrid, productsGridItems } = pageObjects.categoryPage;

  await expect(productsGrid).toBeVisible();
  await expect(productsGridItems).toHaveCount(products.length);

  products.forEach(async (product, i) => {
    const productCard = productsGridItems.nth(i);
    await expect(productCard).toBeVisible();

    const link = productCard.getByRole("link");
    const id = product.id.split("/").pop();
    await expect(link).toHaveAttribute("href", `/products/${id}`);

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

test("render products with discounted price in grid", async ({
  page,
  next,
  pageObjects,
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
    id: "gid://shopify/Product/1",
    title: "Brand 1 - Product 1",
    price: price,
    discountedPrice: discountedPrice,
    images: ["https://mydomain.shopify.com/media/product-1.jpg"],
  });

  shopify.stub({
    request: Request.PRODUCTS_IN_CATEGORY,
    response: {
      status: 200,
      payload: {
        data: collection([product]),
      },
    },
  });

  await page.goto(`http://localhost:${next.port}/categories/aa-1`);

  const { productsGridItems } = pageObjects.categoryPage;

  const productCard = productsGridItems.nth(0);

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

test("products grid ordering", async ({ page, pageObjects, next, shopify }) => {
  const product1 = getProduct({
    id: "gid://shopify/Product/1",
  });

  const product2 = getProduct({
    id: "gid://shopify/Product/2",
  });

  shopify.stub({
    request: Request.PRODUCTS_IN_CATEGORY,
    response: {
      status: 200,
      payload: {
        data: collection([product2, product1]),
      },
    },
  });

  await page.goto(`http://localhost:${next.port}/categories/aa-1`);

  const { productsGridItems } = pageObjects.categoryPage;

  const firstProductInGrid = productsGridItems.nth(0);
  const firstProductInGridLink = firstProductInGrid.getByRole("link");
  await expect(firstProductInGridLink).toHaveAttribute("href", "/products/2");

  const secondProductInGrid = productsGridItems.nth(1);
  const secondProductInGridLink = secondProductInGrid.getByRole("link");
  await expect(secondProductInGridLink).toHaveAttribute("href", "/products/1");
});
