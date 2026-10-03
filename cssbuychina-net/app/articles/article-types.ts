export type Article = {
  label: string;
  title: string;
  description: string;
  seoTitle?: string;
  h1?: string;
  published?: string;
  checked?: string;
  research?: string;
  sections: readonly (readonly [string, readonly string[]])[];
  related?: readonly (readonly [string, string])[];
  table?: { title: string; intro: string; headers: string[]; rows: string[][] };
};
