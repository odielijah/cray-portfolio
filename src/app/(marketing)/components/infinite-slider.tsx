"use client";

import {
  sliderConfig,
  slideSrc,
  slideTitle,
} from "@/app/(marketing)/config/slider-config";
import { useInfiniteSlider } from "@/app/(marketing)/hooks/use-infinite-slider";

export default function InfiniteSlider() {
  const { sliderRef, slideRefs, imgRefs, titleRefs, slideCount } =
    useInfiniteSlider();

  return (
    <section
      ref={sliderRef}
      className="relative w-full h-[100svh] overflow-hidden touch-none active:cursor-grabbing select-none"
      style={{ overscrollBehavior: "none" }}
    >
      <div className="absolute top-45 left-6 text-black z-50">
        <h1 className="header-text w-1/2">Krafting Kultur3</h1>
      </div>

      {Array.from({ length: slideCount }).map((_, i) => {
        const initialImageNumber = (i % sliderConfig.totalSlides) + 1;
        return (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="group absolute left-0 bottom-0 hover:cursor-pointer overflow-hidden will-change-[transform,width,height]"
          >
            {/* eslint-disable-next-line */}
            <img
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              src={slideSrc(initialImageNumber)}
              data-image={initialImageNumber}
              alt=""
              className="w-full h-full object-cover block pointer-events-none scale-100 transition-transform duration-500 ease-out group-hover:scale-110"
            />

            {/* Dark hover overlay + title */}
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-black/0 opacity-0 transition-all duration-500 ease-out group-hover:bg-black/40 group-hover:opacity-100 pointer-events-none">
              <p
                ref={(el) => {
                  titleRefs.current[i] = el;
                }}
                className="text-white text-lg"
              >
                {slideTitle(initialImageNumber)}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
