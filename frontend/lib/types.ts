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
    description?: string;
  };
  activities?: { title: string; detail: string }[];
  skills?: string[];
  sections?: {
    catalogue?: string;
    about?: string;
    education?: string;
    activities?: string;
    skills?: string;
    selected_work?: string;
    watches?: string;
    gallery?: string;
    watches_page?: string;
  };
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
