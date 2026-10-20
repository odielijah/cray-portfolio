import { useEffect, useMemo, useRef } from "react";
import {
  sliderConfig,
  slideSrc,
  slideTitle,
} from "@/app/(marketing)/config/slider-config";

export function useInfiniteSlider() {
  const sliderRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const titleRefs = useRef<(HTMLElement | null)[]>([]);

  const growthRatio = useMemo(() => Math.exp(sliderConfig.growth), []);

  const slideCount = useMemo(
    () =>
      Math.ceil(
        Math.log(1 + (growthRatio - 1) / sliderConfig.minSize) /
          sliderConfig.growth,
      ) + 4,
    [growthRatio],
  );

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const wrap = (value: number, max: number) => ((value % max) + max) % max;

    const edgeX = (position: number, width: number) =>
      (width * sliderConfig.minSize * (Math.pow(growthRatio, position) - 1)) /
      (growthRatio - 1);

    const slideStreamIndex = Array.from({ length: slideCount }, (_, i) => i);

    function setSlideImage(index: number, imageNumber: number) {
      const img = imgRefs.current[index];
      if (!img) return;
      if (img.dataset.image === String(imageNumber)) return;
      img.dataset.image = String(imageNumber);
      img.src = slideSrc(imageNumber);

      const titleEl = titleRefs.current[index];
      if (titleEl) titleEl.textContent = slideTitle(imageNumber);
    }

    let scroll = 0;
    let scrollTarget = 0;
    let rafId: number;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTarget += (e.deltaY + e.deltaX) * sliderConfig.scrollSpeed * 0.0014;
    };

    let lastPointerX: number | null = null;
    let startX = 0;
    let didDrag = false;

    const onPointerDown = (e: PointerEvent) => {
      lastPointerX = e.clientX;
      startX = e.clientX;
      didDrag = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (lastPointerX === null) return;
      if (!didDrag && Math.abs(e.clientX - startX) > 5) {
        didDrag = true;
        slider!.setPointerCapture(e.pointerId);
      }
      if (!didDrag) return;
      scrollTarget +=
        (lastPointerX - e.clientX) * sliderConfig.scrollSpeed * 0.005;
      lastPointerX = e.clientX;
    };
    const releasePointer = () => {
      lastPointerX = null;
    };
    const onClickCapture = (e: MouseEvent) => {
      if (didDrag) {
        e.preventDefault();
        e.stopPropagation();
        didDrag = false;
      }
    };

    slider.addEventListener("wheel", onWheel, { passive: false });
    slider.addEventListener("pointerdown", onPointerDown);
    slider.addEventListener("pointermove", onPointerMove);
    slider.addEventListener("pointerup", releasePointer);
    slider.addEventListener("pointercancel", releasePointer);
    slider.addEventListener("click", onClickCapture, true);

    function render() {
      scroll += (scrollTarget - scroll) * sliderConfig.lerp;

      const sliderWidth = slider!.clientWidth;
      const sliderHeight = slider!.clientHeight;
      const baselineOffset = sliderHeight * sliderConfig.baseline;

      for (let i = 0; i < slideCount; i++) {
        const slideEl = slideRefs.current[i];
        if (!slideEl) continue;

        let streamIndex = slideStreamIndex[i];

        while (edgeX(streamIndex + scroll, sliderWidth) > sliderWidth)
          streamIndex -= slideCount;
        while (edgeX(streamIndex + scroll + 1, sliderWidth) < 0)
          streamIndex += slideCount;
        slideStreamIndex[i] = streamIndex;

        const left = Math.round(edgeX(streamIndex + scroll, sliderWidth));
        const right = Math.round(edgeX(streamIndex + scroll + 1, sliderWidth));
        const width = right - left;
        const height = width / sliderConfig.aspect;

        setSlideImage(i, wrap(streamIndex, sliderConfig.totalSlides) + 1);

        slideEl.style.width = `${width}px`;
        slideEl.style.height = `${height}px`;
        slideEl.style.zIndex = String(Math.round(right));
        slideEl.style.transform = `translate3d(${left}px, ${-baselineOffset}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(rafId);
      slider.removeEventListener("wheel", onWheel);
      slider.removeEventListener("pointerdown", onPointerDown);
      slider.removeEventListener("pointermove", onPointerMove);
      slider.removeEventListener("pointerup", releasePointer);
      slider.removeEventListener("pointercancel", releasePointer);
      slider.removeEventListener("click", onClickCapture, true);
    };
  }, [slideCount, growthRatio]);

  return { sliderRef, slideRefs, imgRefs, titleRefs, slideCount };
}