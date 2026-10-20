import { projects } from "@/app/(marketing)/constants/projects";

export const sliderConfig = {
  totalSlides: projects.length,
  lerp: 0.075,
  scrollSpeed: 3.5,
  minSize: 0.1,
  growth: 0.25,
  aspect: 1 / 1.25,
  baseline: 0.0,
};

const projectAt = (n: number) => projects[n - 1];

export const slideSrc = (n: number) => projectAt(n)?.image ?? "";
export const slideTitle = (n: number) => projectAt(n)?.name ?? "";
export const slideHref = (n: number) => `/work/${projectAt(n)?.id ?? ""}`;