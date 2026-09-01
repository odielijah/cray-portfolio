export const sliderConfig = {
  totalSlides: 10,
  lerp: 0.075,
  scrollSpeed: 3.5,
  minSize: 0.1,
  growth: 0.25,
  aspect: 1 / 1.25,
  baseline: 0.0,
};

export const slideSrc = (n: number) => `/images/slide-${n}.webp`;
 
const slideTitles: Record<number, string> = {
  1: "Title 1",
  2: "Title 2",
  3: "Title 3",
  4: "Title 4",
  5: "Title 5",
  6: "Title 6",
  7: "Title 7",
};
 
export const slideTitle = (n: number) => slideTitles[n] ?? "";
 