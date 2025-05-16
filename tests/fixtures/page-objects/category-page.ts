import { Page } from "@playwright/test";

export class CategoryPage {
  constructor(private readonly page: Page) {}

  readonly breadcrumbs = this.page.getByRole("navigation", {
    name: "breadcrumbs",
  });
  readonly breadcrumbsItems = this.breadcrumbs.getByRole("listitem");

  readonly productsGrid = this.page.getByRole("list", {
    name: "products grid",
  });
  readonly productsGridItems = this.productsGrid.getByRole("listitem");
}
