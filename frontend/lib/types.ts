export type Profile = {
  name: string;
  age: number;
  tagline: string;
  intro: string;
  about: string[];
  facts: { label: string; value: string }[];
  education?: {
    school: string;
    programme: string;
  };
  activities?: { title: string; detail: string }[];
  skills?: string[];
};

export type Artwork = {
  id: string;
  title: string;
  year: number;
  medium: string;
  size: string;
  note: string;
  accent: string;
  wash: string;
  image?: string | null;
};

export type Watch = {
  id: string;
  name: string;
  year_acquired: number;
  movement: string;
  note: string;
  origin: string;
};
