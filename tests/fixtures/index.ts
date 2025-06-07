import fs from "fs";
import { mergeTests, Page } from "@playwright/test";
import { nextFixture } from "./next";
import { shopifyFixture } from "./shopify";
import { pageObjectsFixture } from "./page-objects";

export const mergedFixtures = mergeTests(
  pageObjectsFixture,
  nextFixture,
  shopifyFixture
);

export const test = mergedFixtures.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await page.route(
      "https://mydomain.shopify.com/media/**/*.{png,jpg,jpeg,webp,gif,svg}",
      async (route) => {
        await route.fulfill({
          status: 200,
          body: fs.readFileSync("./tests/assets/sample-product-image.webp"),
        });
      }
    );

    use(page);
  },
});
