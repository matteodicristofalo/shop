import { Page } from "@playwright/test";

export class Cart {
  constructor(private readonly page: Page) {}

  readonly openCart = async () => {
    this.page
      .getByRole("banner")
      .getByRole("button", {
        name: "Carrello",
        exact: false,
      })
      .click();
  };

  readonly cartDrawer = this.page.getByTestId("cart");
  readonly cartItems = this.cartDrawer
    .getByRole("list", { name: "cart items" })
    .getByRole("listitem");

  private readonly closeButton = this.page.getByTestId("close-cart-drawer");
  readonly closeCart = async () => {
    await this.closeButton.waitFor({ state: "visible" });
    await this.closeButton.click();
  };
}
