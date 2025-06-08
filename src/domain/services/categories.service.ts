import { Nullable } from "@utils/types.utils";

export type Category = {
  id: string;
  name: string;
  children?: Category[];
};

const categories: Category[] = [
  {
    id: "aa-1",
    name: "Abbigliamento",
    children: [
      {
        id: "aa-1-13",
        name: "Parte superiore",
        children: [
          {
            id: "aa-1-13-1",
            name: "Camicie",
          },
          {
            id: "aa-1-13-3",
            name: "Cardigan",
          },
          {
            id: "aa-1-13-5",
            name: "Overshirt",
          },
          {
            id: "aa-1-13-6",
            name: "Polo",
          },
          {
            id: "aa-1-13-7",
            name: "Magliette",
          },
          {
            id: "aa-1-13-12",
            name: "Maglioni",
          },
          {
            id: "aa-1-13-14",
            name: "Felpe",
          },
          {
            id: "aa-1-13-8",
            name: "T-Shirt",
          },
          {
            id: "aa-1-13-9",
            name: "Canotte",
          },
        ],
      },
      {
        id: "aa-1-11",
        name: "Parte inferiore",
        children: [
          {
            id: "aa-1-12",
            name: "Pantaloni",
            children: [
              {
                id: "aa-1-12-2",
                name: "Cargo",
              },
              {
                id: "aa-1-12-4",
                name: "Jeans",
              },
              {
                id: "aa-1-12-7",
                name: "Joggers",
              },
              {
                id: "aa-1-12-11",
                name: "Pantaloni",
              },
            ],
          },
          {
            id: "aa-1-14",
            name: "Pantaloncini",
            children: [
              {
                id: "aa-1-14-2",
                name: "Pantaloncini cargo",
              },
              {
                id: "aa-1-14-5",
                name: "Short jeans",
              },
              {
                id: "aa-1-14-4",
                name: "Pantaloni corti",
              },
            ],
          },
          {
            id: "aa-1-15",
            name: "Gonne",
          },
        ],
      },
      {
        id: "aa-1-10",
        name: "Outwear",
        children: [
          {
            id: "aa-1-10-2",
            name: "Cappotti e giacche",
            children: [
              {
                id: "aa-1-10-2-2",
                name: "Bomber",
              },
              {
                id: "aa-1-10-2-5",
                name: "Cappotti",
              },
              {
                id: "aa-1-10-2-9",
                name: "Piumini",
              },
              {
                id: "aa-1-10-2-13",
                name: "Trench",
              },
              {
                id: "aa-1-10-2-14",
                name: "Giacche in pelle",
              },
              {
                id: "aa-1-10-2-15",
                name: "Varsity",
              },
              {
                id: "aa-1-10-2-16",
                name: "Giacche a vento",
              },
            ],
          },
          {
            id: "aa-1-10-6",
            name: "Gilet",
          },
        ],
      },
    ],
  },
  {
    id: "aa-8",
    name: "Scarpe",
    children: [
      {
        id: "aa-8-3",
        name: "Stivali",
      },
      {
        id: "aa-8-9",
        name: "Scarpe basse",
      },
      {
        id: "aa-8-6",
        name: "Sandali",
      },
      {
        id: "aa-8-8",
        name: "Sneakers",
      },
    ],
  },
  {
    id: "aa-2",
    name: "Accessori",
    children: [
      {
        id: "aa-2-6",
        name: "Cinture",
      },
      {
        id: "aa-2-17",
        name: "Cappelli",
      },
      {
        id: "aa-2-26",
        name: "Sciarpe",
      },
      {
        id: "aa-2-27",
        name: "Occhiali da sole",
      },
    ],
  },
  {
    id: "aa-6",
    name: "Gioielleria",
    children: [
      {
        id: "aa-6-3",
        name: "Bracciali",
      },
      {
        id: "aa-6-6",
        name: "Orecchini",
      },
      {
        id: "aa-6-8",
        name: "Collane",
      },
      {
        id: "aa-6-9",
        name: "Anelli",
      },
    ],
  },
];

const flatCategories = flattenCategories(categories);

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(
  id: string,
  options: { anchestors: boolean } = { anchestors: false }
): Nullable<
  Category & {
    anchestors?: Nullable<Category[]>;
  }
> {
  const category = flatCategories.find((cat) => cat.id === id);

  if (!category) {
    return null;
  }

  if (!options.anchestors) {
    return { ...category };
  }

  return {
    ...category,
    anchestors: getCategoryAncestors(categories, id),
  };
}

function flattenCategories(categories: Category[]): Category[] {
  return categories.flatMap((category) => {
    const { children, ...rest } = category;
    return children
      ? [{ ...rest }, ...flattenCategories(children)]
      : [category];
  });
}

function getCategoryAncestors(
  categories: Category[],
  targetId: string,
  anchestors: Category[] = []
): Nullable<Category[]> {
  for (const category of categories) {
    if (category.id === targetId) {
      return anchestors;
    }

    const { children, ...rest } = category;

    if (children) {
      const result = getCategoryAncestors(children, targetId, [
        ...anchestors,
        { ...rest },
      ]);

      if (result) {
        return result;
      }
    }
  }

  return null;
}
