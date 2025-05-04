export function getBrand(title: string): string {
  const splittedTitle = title.split("-");
  const maybeBrand = splittedTitle.at(0)?.trim();
  return maybeBrand ?? "";
}

export function getName(title: string): string {
  const splittedTitle = title.split("-");
  const maybeName = splittedTitle.at(1)?.trim();
  return maybeName ?? "";
}

export function getId(shopifyId: string): string {
  const splittedId = shopifyId.split("/");
  const maybeId = splittedId.at(-1);
  return maybeId ?? "";
}
