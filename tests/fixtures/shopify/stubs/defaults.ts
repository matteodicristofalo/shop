import { getCart } from "./cart";
import { collection } from "./collection";
import { Request, Response } from "../types";

export function getDefaultStubs(): Partial<Record<Request, Response>> {
  return {
    [Request.CREATE_CART]: {
      status: 200,
      payload: {
        data: {
          cartCreate: {
            cart: getCart({
              id: "cartId",
              lines: [],
            }),
          },
        },
      },
    },
    [Request.PRODUCTS_IN_CATEGORY]: {
      status: 200,
      payload: {
        data: collection([]),
      },
    },
    [Request.PRODUCT_RECOMMENDATIONS]: {
      status: 404,
      payload: {},
    },
  };
}
