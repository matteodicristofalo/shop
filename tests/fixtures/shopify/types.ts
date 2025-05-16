export type Stub = {
  request: Request;
  response: Response;
};

export enum Request {
  CREATE_CART = "CreateCart",
  GET_CART = "GetCart",
  ADD_TO_CART = "AddToCart",
  REMOVE_FROM_CART = "RemoveFromCart",
  PRODUCTS_IN_CATEGORY = "GetProductsInCategory",
  PRODUCT = "GetProduct",
  PRODUCT_RECOMMENDATIONS = "GetRecommendations",
}

export type Response = Partial<{
  status: number;
  payload: unknown;
}>;
