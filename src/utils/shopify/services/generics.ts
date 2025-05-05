export function getId(shopifyId: string): string {
  const splittedId = shopifyId.split("/");
  const maybeId = splittedId.at(-1);
  return maybeId ?? "";
}
