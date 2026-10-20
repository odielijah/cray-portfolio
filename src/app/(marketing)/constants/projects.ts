export interface Project {
  id: string;
  name: string;
  category: "image" | "film" | "image & film" | "film & image";
  image: string;
}

export const projects: Project[] = [
  {
    id: "jollof-festival",
    name: "Jollof Festival",
    category: "image & film",
    image: "/images/slide-1.webp",
  },
  {
    id: "squad",
    name: "Squad",
    category: "image",
    image: "/images/slide-2.webp",
  },
  {
    id: "ulises",
    name: "Ulises",
    category: "film & image",
    image: "/images/slide-3.webp",
  },
  {
    id: "alex",
    name: "Alex",
    category: "image",
    image: "/images/slide-4.webp",
  },
  {
    id: "alys-thomas",
    name: "Alys Thomas",
    category: "image & film",
    image: "/images/slide-5.webp",
  },
  {
    id: "arnaud",
    name: "Arnaud",
    category: "image & film",
    image: "/images/slide-6.webp",
  },
  {
    id: "charlie-faye-mather",
    name: "Charlie Faye Mather",
    category: "image & film",
    image: "/images/slide-7.webp",
  },
];
