const categories = [
  {
    id: "aa-1",
    name: "Abbigliamento",
  },
  {
    id: "aa-8",
    name: "Scarpe",
  },
  {
    id: "aa-2",
    name: "Accessori",
  },
];

export function getCategories() {
  return categories;
}

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}
