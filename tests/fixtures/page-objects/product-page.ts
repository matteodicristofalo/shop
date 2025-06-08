import { Page } from "@playwright/test";

export class ProductPage {
  constructor(private readonly page: Page) {}

  private readonly h1 = this.page.getByRole("heading", {
    level: 1,
  });
  readonly productBrand = this.h1.getByTestId("product-brand");
  readonly productName = this.h1.getByTestId("product-name");

  readonly productPrice = this.page.getByTestId("product-price");
  readonly productDiscountedPrice = this.page.getByTestId(
    "product-discounted-price"
  );

  readonly productImages = this.page
    .getByTestId("product-media")
    .getByRole("img");

  readonly sizeSelector = this.page.getByRole("group");
  readonly sizes = this.sizeSelector.getByRole("radio");

  readonly addToCartButton = this.page.getByRole("button", {
    name: "Aggiungi al carrello",
  });

  private readonly cartDrawer = this.page.getByTestId("cart");
  readonly addToCart = async () => {
    await this.addToCartButton.click();
    await this.cartDrawer.waitFor({ state: "visible" });
  };

  readonly soldOutButton = this.page.getByRole("button", {
    name: "Sold out",
  });

  readonly selectSizeButton = this.page.getByRole("button", {
    name: "Seleziona taglia",
  });

  readonly productRecommendations = this.page.getByTestId(
    "product-recommendations"
  );
  readonly productRecommendationsItems =
    this.productRecommendations.getByRole("listitem");
}
