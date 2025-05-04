"use server";

export async function addToCart(
  _previousState: boolean,
  formData: FormData
): Promise<boolean> {
  const cartId = formData.get("cartId");
  const size = formData.get("size");

  if (!cartId || !size) {
    return true;
  }

  // Simulate a network request
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return false;
}
