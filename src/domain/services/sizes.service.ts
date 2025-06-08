const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function sizeComparator(a: string, b: string) {
  if (isClothingSize(a) && isClothingSize(b)) {
    return clothingSizes.indexOf(a) - clothingSizes.indexOf(b);
  }

  if (isNumericSize(a) && isNumericSize(b)) {
    return Number(a) - Number(b);
  }

  return a.localeCompare(b);
}

function isClothingSize(size: string) {
  return clothingSizes.includes(size);
}

function isNumericSize(size: string) {
  return !isNaN(Number(size));
}
