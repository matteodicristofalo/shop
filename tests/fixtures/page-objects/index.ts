import test from "@playwright/test";
import { CategoryPage } from "./category-page";
import { ProductPage } from "./product-page";
import { Cart } from "./cart";

type PageObjects = {
  categoryPage: CategoryPage;
  productPage: ProductPage;
  cart: Cart;
};

export const pageObjectsFixture = test.extend<{
  pageObjects: PageObjects;
}>({
  pageObjects: async ({ page }, use) => {
    const pageObjects: PageObjects = {
      categoryPage: new CategoryPage(page),
      productPage: new ProductPage(page),
      cart: new Cart(page),
    };

    await use(pageObjects);
  },
});
