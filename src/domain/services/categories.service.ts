import { Category } from "@domain/models/categories.models";
import { Nullable } from "@utils/types.utils";

const categories: Category[] = [
  {
    id: "aa-1",
    name: "Abbigliamento",
    slug: "clothing",
    ancestors: [],
    children: [
      {
        id: "aa-1-13",
        name: "Parte superiore",
        slug: "tops",
        ancestors: [{ name: "Abbigliamento", slug: "clothing" }],
        children: [
          {
            id: "aa-1-13-1",
            name: "Camicie",
            slug: "shirts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-3",
            name: "Cardigan",
            slug: "cardigans",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-5",
            name: "Overshirt",
            slug: "overshirts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-6",
            name: "Polo",
            slug: "polo-shirts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-7",
            name: "Magliette",
            slug: "tops",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-12",
            name: "Maglioni",
            slug: "sweaters",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-14",
            name: "Felpe",
            slug: "sweatshirts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-8",
            name: "T-Shirt",
            slug: "t-shirts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
          {
            id: "aa-1-13-9",
            name: "Canotte",
            slug: "tank-tops",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte superiore", slug: "tops" },
            ],
          },
        ],
      },
      {
        id: "aa-1-11",
        name: "Parte inferiore",
        slug: "bottoms",
        ancestors: [{ name: "Abbigliamento", slug: "clothing" }],
        children: [
          {
            id: "aa-1-12",
            name: "Pantaloni",
            slug: "trousers",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte inferiore", slug: "bottoms" },
            ],
            children: [
              {
                id: "aa-1-12-2",
                name: "Cargo",
                slug: "cargo-pants",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloni", slug: "trousers" },
                ],
              },
              {
                id: "aa-1-12-4",
                name: "Jeans",
                slug: "jeans",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloni", slug: "trousers" },
                ],
              },
              {
                id: "aa-1-12-7",
                name: "Joggers",
                slug: "joggers",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloni", slug: "trousers" },
                ],
              },
              {
                id: "aa-1-12-11",
                name: "Pantaloni",
                slug: "pants",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloni", slug: "trousers" },
                ],
              },
            ],
          },
          {
            id: "aa-1-14",
            name: "Pantaloncini",
            slug: "shorts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte inferiore", slug: "bottoms" },
            ],
            children: [
              {
                id: "aa-1-14-2",
                name: "Pantaloncini cargo",
                slug: "cargo-shorts",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloncini", slug: "shorts" },
                ],
              },
              {
                id: "aa-1-14-5",
                name: "Short jeans",
                slug: "denim-shorts",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloncini", slug: "shorts" },
                ],
              },
              {
                id: "aa-1-14-4",
                name: "Pantaloni corti",
                slug: "short-pants",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Parte inferiore", slug: "bottoms" },
                  { name: "Pantaloncini", slug: "shorts" },
                ],
              },
            ],
          },
          {
            id: "aa-1-15",
            name: "Gonne",
            slug: "skirts",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Parte inferiore", slug: "bottoms" },
            ],
          },
        ],
      },
      {
        id: "aa-1-10",
        name: "Outwear",
        slug: "outerwear",
        ancestors: [{ name: "Abbigliamento", slug: "clothing" }],
        children: [
          {
            id: "aa-1-10-2",
            name: "Cappotti e giacche",
            slug: "coats-and-jackets",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Outwear", slug: "outerwear" },
            ],
            children: [
              {
                id: "aa-1-10-2-2",
                name: "Bomber",
                slug: "bomber-jackets",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
              {
                id: "aa-1-10-2-5",
                name: "Cappotti",
                slug: "coats",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
              {
                id: "aa-1-10-2-9",
                name: "Piumini",
                slug: "down-jackets",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
              {
                id: "aa-1-10-2-13",
                name: "Trench",
                slug: "trench-coats",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
              {
                id: "aa-1-10-2-14",
                name: "Giacche in pelle",
                slug: "leather-jackets",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
              {
                id: "aa-1-10-2-15",
                name: "Varsity",
                slug: "varsity-jackets",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
              {
                id: "aa-1-10-2-16",
                name: "Giacche a vento",
                slug: "windbreakers",
                ancestors: [
                  { name: "Abbigliamento", slug: "clothing" },
                  { name: "Outwear", slug: "outerwear" },
                  { name: "Cappotti e giacche", slug: "coats-and-jackets" },
                ],
              },
            ],
          },
          {
            id: "aa-1-10-6",
            name: "Gilet",
            slug: "vests",
            ancestors: [
              { name: "Abbigliamento", slug: "clothing" },
              { name: "Outwear", slug: "outerwear" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "aa-8",
    name: "Scarpe",
    slug: "shoes",
    ancestors: [],
    children: [
      {
        id: "aa-8-10",
        name: "Stivali",
        slug: "boots",
        ancestors: [{ name: "Scarpe", slug: "shoes" }],
      },
      {
        id: "aa-8-9",
        name: "Scarpe basse",
        slug: "flats",
        ancestors: [{ name: "Scarpe", slug: "shoes" }],
      },
      {
        id: "aa-8-6",
        name: "Sandali",
        slug: "sandals",
        ancestors: [{ name: "Scarpe", slug: "shoes" }],
      },
      {
        id: "aa-8-8",
        name: "Sneakers",
        slug: "sneakers",
        ancestors: [{ name: "Scarpe", slug: "shoes" }],
      },
    ],
  },
  {
    id: "aa-2",
    name: "Accessori",
    slug: "accessories",
    ancestors: [],
    children: [
      {
        id: "aa-2-1",
        name: "Cinture",
        slug: "belts",
        ancestors: [{ name: "Accessori", slug: "accessories" }],
      },
      {
        id: "aa-2-17",
        name: "Cappelli",
        slug: "hats",
        ancestors: [{ name: "Accessori", slug: "accessories" }],
      },
      {
        id: "aa-2-26",
        name: "Sciarpe",
        slug: "scarves",
        ancestors: [{ name: "Accessori", slug: "accessories" }],
      },
      {
        id: "aa-2-27",
        name: "Occhiali da sole",
        slug: "sunglasses",
        ancestors: [{ name: "Accessori", slug: "accessories" }],
      },
    ],
  },
  {
    id: "aa-6",
    name: "Gioielleria",
    slug: "jewelry",
    ancestors: [],
    children: [
      {
        id: "aa-6-1",
        name: "Bracciali",
        slug: "bracelets",
        ancestors: [{ name: "Gioielleria", slug: "jewelry" }],
      },
      {
        id: "aa-6-6",
        name: "Orecchini",
        slug: "earrings",
        ancestors: [{ name: "Gioielleria", slug: "jewelry" }],
      },
      {
        id: "aa-6-8",
        name: "Collane",
        slug: "necklaces",
        ancestors: [{ name: "Gioielleria", slug: "jewelry" }],
      },
      {
        id: "aa-6-9",
        name: "Anelli",
        slug: "rings",
        ancestors: [{ name: "Gioielleria", slug: "jewelry" }],
      },
    ],
  },
];

const flatCategories = flattenCategories(categories);

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(
  slug: string,
  options: { anchestors: boolean } = { anchestors: false }
): Nullable<
  Category & {
    anchestors?: Nullable<Category[]>;
  }
> {
  const category = flatCategories.find((cat) => cat.slug === slug);

  if (!category) {
    return null;
  }

  if (!options.anchestors) {
    return { ...category };
  }

  return {
    ...category,
    anchestors: getCategoryAncestors(categories, category.id),
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
