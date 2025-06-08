export type Category = {
  id: string;
  name: string;
  slug: string;
  ancestors: {
    name: string;
    slug: string;
  }[];
  children?: Category[];
};
