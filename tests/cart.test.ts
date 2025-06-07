import { getCart, getCartLine } from "./fixtures/shopify/stubs/cart";
import { expect, Page } from "@playwright/test";
import { getProduct } from "./fixtures/shopify/stubs/product";
import { Request } from "./fixtures/shopify/types";
import { test } from "./fixtures";
import { waitForBeingDefined } from "./utils/wait";

test("create cart and store the id into localStorage", async ({
  page,
  next,
  shopify,
}) => {
  const cartId = "gid://shopify/Cart/1234567890";
  const emptyCart = getCart({
    id: cartId,
    lines: [],
  });

  shopify.stub({
    request: Request.CREATE_CART,
    response: {
      payload: {
        data: {
          cartCreate: {
            cart: emptyCart,
          },
        },
      },
    },
  });

  await page.goto(`http://localhost:${next.port}/`);

  const localStorageCartId = await waitForBeingDefined(() =>
    page.evaluate(() => localStorage.getItem("cartId"))
  );

  expect(localStorageCartId).toBe(cartId);
});

test("load cart getting the id from localStorage", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const productInCart = getProduct({
    id: "gid://shopify/Product/3456789012",
    title: "New Balance - 991v2",
    images: ["https://mydomain.shopify.com/media/image.jpg"],
    price: { amount: "20.00", currencyCode: "EUR" },
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const existingCart = getCart({
    id: cartId,
    lines: [getCartLine(productInCart, "Taglia unica", 1)],
  });

  shopify.stub({
    request: Request.GET_CART,
    response: {
      payload: {
        data: {
          cart: existingCart,
        },
      },
    },
  });

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/`);

  const { openCart, cartDrawer, cartItems } = pageObjects.cart;

  await openCart();

  const cartCount = cartDrawer.getByText("Carrello (1)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(1);

  const cartItem = cartItems.nth(0);
  await expect(cartItem).toBeVisible();
  await expect(cartItem.getByRole("link")).toHaveAttribute(
    "href",
    "/products/3456789012"
  );
  const image = cartItem.getByRole("img");
  await expect(image).toHaveAttribute(
    "src",
    "https://mydomain.shopify.com/media/image.jpg"
  );
  await expect(cartItem.getByText("New Balance")).toBeVisible();
  await expect(cartItem.getByText("991v2")).toBeVisible();
  await expect(cartItem.getByText("Taglia unica")).toBeVisible();
  await expect(cartItem.getByText("20.00 EUR")).toBeVisible();

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento 20.00 EUR",
  });
  await expect(checkoutButton).toBeVisible();
});

test("empty cart", async ({ page, pageObjects, next, shopify }) => {
  const cartId = "gid://shopify/Cart/1234567890";
  const emptyCart = getCart({
    id: cartId,
    lines: [],
  });

  shopify.stub({
    request: Request.GET_CART,
    response: {
      payload: {
        data: {
          cart: emptyCart,
        },
      },
    },
  });

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/`);

  const { openCart, cartDrawer, cartItems } = pageObjects.cart;

  await openCart();

  const cartCount = cartDrawer.getByText("Carrello (0)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(0);

  await expect(cartDrawer.getByText("Il tuo carrello è vuoto")).toBeVisible();

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento",
    exact: false,
  });
  await expect(checkoutButton).not.toBeAttached();
});

test("cart items ordering", async ({ page, pageObjects, next, shopify }) => {
  const firstProductAdded = getProduct({
    id: "gid://shopify/Product/3456789013",
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const secondProductAdded = getProduct({
    id: "gid://shopify/Product/3456789012",
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const thirdProductAdded = getProduct({
    id: "gid://shopify/Product/3456789014",
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const existingCart = getCart({
    id: cartId,
    lines: [
      getCartLine(firstProductAdded, "Taglia unica", 1),
      getCartLine(secondProductAdded, "Taglia unica", 1),
      getCartLine(thirdProductAdded, "Taglia unica", 1),
    ],
  });

  shopify.stub({
    request: Request.GET_CART,
    response: {
      payload: {
        data: {
          cart: existingCart,
        },
      },
    },
  });

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/`);

  const { openCart, cartItems } = pageObjects.cart;

  await openCart();

  const firstCartItem = cartItems.nth(0);
  await expect(firstCartItem.getByRole("link")).toHaveAttribute(
    "href",
    "/products/3456789013"
  );

  const secondCartItem = cartItems.nth(1);
  await expect(secondCartItem.getByRole("link")).toHaveAttribute(
    "href",
    "/products/3456789012"
  );

  const thirdCartItem = cartItems.nth(2);
  await expect(thirdCartItem.getByRole("link")).toHaveAttribute(
    "href",
    "/products/3456789014"
  );
});

test("add to cart", async ({ page, pageObjects, next, shopify }) => {
  const product = getProduct({
    id: "gid://shopify/Product/3456789012",
    title: "New Balance - 991v2",
    price: {
      amount: "20.00",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/image.jpg"],
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const cartBeforeAddToCart = getCart({
    id: cartId,
    lines: [],
  });
  const cartAfterAddToCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "Taglia unica", 1)],
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
      request: Request.GET_CART,
      response: {
        payload: {
          data: {
            cart: cartBeforeAddToCart,
          },
        },
      },
    },
    {
      request: Request.ADD_TO_CART,
      response: {
        payload: {
          data: {
            cartLinesAdd: {
              cart: cartAfterAddToCart,
            },
          },
        },
      },
    },
  ]);

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/products/3456789012`);

  const { addToCart } = pageObjects.productPage;
  const { cartDrawer, cartItems } = pageObjects.cart;

  await addToCart();

  const cartCount = cartDrawer.getByText("Carrello (1)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(1);

  const cartItem = cartItems.nth(0);
  await expect(cartItem).toBeVisible();
  await expect(cartItem.getByRole("link")).toHaveAttribute(
    "href",
    "/products/3456789012"
  );
  const image = cartItem.getByRole("img");
  await expect(image).toHaveAttribute(
    "src",
    "https://mydomain.shopify.com/media/image.jpg"
  );
  await expect(cartItem.getByText("New Balance")).toBeVisible();
  await expect(cartItem.getByText("991v2")).toBeVisible();
  await expect(cartItem.getByText("Taglia unica")).toBeVisible();
  await expect(cartItem.getByText("20.00 EUR")).toBeVisible();

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento 20.00 EUR",
  });
  await expect(checkoutButton).toBeVisible();
});

test("add to cart an already existing product variant", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/3456789012",
    title: "New Balance - 991v2",
    price: {
      amount: "20.00",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/image.jpg"],
    variants: [
      {
        title: "S",
      },
      {
        title: "M",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const cartBeforeAddToCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "S", 1)],
  });
  const cartAfterAddToCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "S", 2)],
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
      request: Request.GET_CART,
      response: {
        payload: {
          data: {
            cart: cartBeforeAddToCart,
          },
        },
      },
    },
    {
      request: Request.ADD_TO_CART,
      response: {
        payload: {
          data: {
            cartLinesAdd: {
              cart: cartAfterAddToCart,
            },
          },
        },
      },
    },
  ]);

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/products/3456789012`);

  const { sizeSelector, addToCart } = pageObjects.productPage;
  const { cartDrawer, cartItems } = pageObjects.cart;

  const alreadyInCartSize = sizeSelector.getByText("S", {
    exact: true,
  });
  await alreadyInCartSize.click();

  await addToCart();

  const cartCount = cartDrawer.getByText("Carrello (2)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(2);

  ["S", "S"].forEach(async (variant, i) => {
    const cartItem = cartItems.nth(i);
    await expect(cartItem).toBeVisible();
    await expect(cartItem.getByRole("link")).toHaveAttribute(
      "href",
      "/products/3456789012"
    );
    const image = cartItem.getByRole("img");
    await expect(image).toHaveAttribute(
      "src",
      "https://mydomain.shopify.com/media/image.jpg"
    );
    await expect(cartItem.getByText("New Balance")).toBeVisible();
    await expect(cartItem.getByText("991v2")).toBeVisible();
    await expect(cartItem.getByText(variant)).toBeVisible();
    await expect(cartItem.getByText("20.00 EUR")).toBeVisible();
  });

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento 40.00 EUR",
  });
  await expect(checkoutButton).toBeVisible();
});

test("add to cart a not already existing product variant", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/3456789012",
    title: "New Balance - 991v2",
    price: {
      amount: "20.00",
      currencyCode: "EUR",
    },
    images: ["https://mydomain.shopify.com/media/image.jpg"],
    variants: [
      {
        title: "S",
      },
      {
        title: "XL",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const cartBeforeAddToCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "S", 1)],
  });
  const cartAfterAddToCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "S", 1), getCartLine(product, "XL", 1)],
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
      request: Request.GET_CART,
      response: {
        payload: {
          data: {
            cart: cartBeforeAddToCart,
          },
        },
      },
    },
    {
      request: Request.ADD_TO_CART,
      response: {
        payload: {
          data: {
            cartLinesAdd: {
              cart: cartAfterAddToCart,
            },
          },
        },
      },
    },
  ]);

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/products/3456789012`);

  const { sizeSelector, addToCart } = pageObjects.productPage;
  const { cartDrawer, cartItems } = pageObjects.cart;

  const notAlreadyInCartSize = sizeSelector.getByText("XL", {
    exact: true,
  });
  await notAlreadyInCartSize.click();

  await addToCart();

  const cartCount = cartDrawer.getByText("Carrello (2)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(2);

  ["S", "XL"].forEach(async (variant, i) => {
    const cartItem = cartItems.nth(i);
    await expect(cartItem).toBeVisible();
    await expect(cartItem.getByRole("link")).toHaveAttribute(
      "href",
      "/products/3456789012"
    );
    const image = cartItem.getByRole("img");
    await expect(image).toHaveAttribute(
      "src",
      "https://mydomain.shopify.com/media/image.jpg"
    );
    await expect(cartItem.getByText("New Balance")).toBeVisible();
    await expect(cartItem.getByText("991v2")).toBeVisible();
    await expect(cartItem.getByText(variant)).toBeVisible();
    await expect(cartItem.getByText("20.00 EUR")).toBeVisible();
  });

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento 40.00 EUR",
  });
  await expect(checkoutButton).toBeVisible();
});

test("remove product from cart", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    id: "gid://shopify/Product/3456789015",
    price: {
      amount: "20.00",
      currencyCode: "EUR",
    },
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const productToBeRemoved = getProduct({
    id: "gid://shopify/Product/3456789012",
    price: {
      amount: "40.00",
      currencyCode: "EUR",
    },
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const cartBeforeRemoveFromCart = getCart({
    id: cartId,
    lines: [
      getCartLine(product, "Taglia unica", 1),
      getCartLine(productToBeRemoved, "Taglia unica", 1),
    ],
  });
  const cartAfterRemoveFromCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "Taglia unica", 1)],
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
      request: Request.GET_CART,
      response: {
        payload: {
          data: {
            cart: cartBeforeRemoveFromCart,
          },
        },
      },
    },
    {
      request: Request.REMOVE_FROM_CART,
      response: {
        payload: {
          data: {
            cartLinesUpdate: {
              cart: cartAfterRemoveFromCart,
            },
          },
        },
      },
    },
  ]);

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}`);

  const { openCart, cartDrawer, cartItems } = pageObjects.cart;

  await openCart();

  const cartItemToBeRemoved = cartItems.nth(1);
  const removeFromCartButton = cartItemToBeRemoved.getByRole("button", {
    name: "Rimuovi",
  });
  await removeFromCartButton.click();

  const cartCount = cartDrawer.getByText("Carrello (1)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(1);

  const cartItem = cartItems.nth(0);
  await expect(cartItem.getByRole("link")).toHaveAttribute(
    "href",
    "/products/3456789015"
  );

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento 20.00 EUR",
  });
  await expect(checkoutButton).toBeVisible();
});

test("remove product from cart when it's the only one", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const product = getProduct({
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const cartBeforeAddToCart = getCart({
    id: cartId,
    lines: [getCartLine(product, "Taglia unica", 1)],
  });
  const cartAfterAddToCart = getCart({
    id: cartId,
    lines: [],
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
      request: Request.GET_CART,
      response: {
        payload: {
          data: {
            cart: cartBeforeAddToCart,
          },
        },
      },
    },
    {
      request: Request.REMOVE_FROM_CART,
      response: {
        payload: {
          data: {
            cartLinesUpdate: {
              cart: cartAfterAddToCart,
            },
          },
        },
      },
    },
  ]);

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}`);

  const { openCart, cartDrawer, cartItems } = pageObjects.cart;

  await openCart();

  const cartItemToBeRemoved = cartItems.nth(0);
  const removeFromCartButton = cartItemToBeRemoved.getByRole("button", {
    name: "Rimuovi",
  });
  await removeFromCartButton.click();

  const cartCount = cartDrawer.getByText("Carrello (0)");
  expect(cartCount).toBeVisible();

  expect(cartItems).toHaveCount(0);

  await expect(cartDrawer.getByText("Il tuo carrello è vuoto")).toBeVisible();

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento",
    exact: false,
  });
  await expect(checkoutButton).not.toBeAttached();
});

test("redirect to checkout page when checkout button is clicked", async ({
  page,
  pageObjects,
  next,
  shopify,
}) => {
  const productInCart = getProduct({
    variants: [
      {
        title: "Taglia unica",
      },
    ],
  });

  const cartId = "gid://shopify/Cart/1234567890";
  const cart = getCart({
    id: cartId,
    lines: [getCartLine(productInCart, "Taglia unica", 1)],
  });

  shopify.stub({
    request: Request.GET_CART,
    response: {
      payload: {
        data: {
          cart,
        },
      },
    },
  });

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/`);

  const { openCart, cartDrawer } = pageObjects.cart;

  await openCart();

  const checkoutButton = cartDrawer.getByRole("button", {
    name: "Vai al pagamento",
    exact: false,
  });
  await checkoutButton.click();

  await expect(page).toHaveURL(cart.checkoutUrl);
});

test("close cart", async ({ page, pageObjects, next, shopify }) => {
  const cartId = "gid://shopify/Cart/1234567890";
  shopify.stub({
    request: Request.GET_CART,
    response: {
      payload: {
        data: {
          cart: getCart({
            id: cartId,
          }),
        },
      },
    },
  });

  await setCartIdInLocalStorage(page, cartId);
  await page.goto(`http://localhost:${next.port}/`);

  const { cartDrawer, openCart, closeCart } = pageObjects.cart;

  await openCart();

  await closeCart();

  await expect(cartDrawer).not.toBeInViewport();
});

async function setCartIdInLocalStorage(page: Page, cartId: string) {
  await page.addInitScript((cartId) => {
    localStorage.setItem("cartId", cartId);
  }, cartId);
}
