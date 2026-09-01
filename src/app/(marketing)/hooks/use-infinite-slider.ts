import { useEffect, useMemo, useRef } from "react";
import {
  sliderConfig,
  slideSrc,
  slideTitle,
} from "@/app/(marketing)/config/slider-config";

/**
 * Drives an "infinite" horizontal slider where slides grow exponentially
 * wider as they approach the right edge, then wrap back around to the left
 * once they scroll past. All positioning is imperative (direct DOM writes
 * on every animation frame) rather than React state, because re-rendering
 * React on every frame of a drag/scroll animation would be far too slow.
 *
 * Usage: call this hook, then wire its returned refs onto your JSX —
 * `sliderRef` on the container, `slideRefs`/`imgRefs` on each slide, and
 * `titleRefs` on each slide's hover-overlay title element.
 */
export function useInfiniteSlider() {
  // Container that listens for wheel/pointer input and reports its width/height.
  const sliderRef = useRef<HTMLDivElement>(null);
  // One entry per rendered slide wrapper <div> — written to directly for
  // width/height/position instead of via React state (see comment above).
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  // One entry per rendered <img> — swapped to a new image source as it
  // wraps around, so the same DOM node gets reused for a "new" slide.
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  // One entry per rendered title element (hover overlay) — text is updated
  // in lockstep with the image swap below, same reasoning: this happens
  // outside React's render cycle, so it can't be driven by props/state.
  const titleRefs = useRef<(HTMLElement | null)[]>([]);

  // How much bigger each successive slide is than the last, e.g. growth of
  // 0.25 means each slide is ~28% wider than the previous one (e^0.25).
  const growthRatio = useMemo(() => Math.exp(sliderConfig.growth), []);

  // How many slide slots we need to render simultaneously to always fill
  // the screen width, given the exponential growth curve above. Padded
  // with +4 extra slots so slides are already off-screen-ready before they
  // scroll into view (avoids a visible "pop-in" at the edges).
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

    // Wraps a value into the [0, max) range — used to cycle through the
    // fixed pool of source images (slide 1..totalSlides) forever.
    const wrap = (value: number, max: number) => ((value % max) + max) % max;

    // Converts a slide's "stream position" (its index along the infinite
    // scroll, including fractional scroll offset) into an actual pixel X
    // coordinate. The exponential curve is what makes each slide wider
    // than the last as it approaches the right edge of the screen.
    const edgeX = (position: number, width: number) =>
      (width * sliderConfig.minSize * (Math.pow(growthRatio, position) - 1)) /
      (growthRatio - 1);

    // Tracks each slide slot's current position in the infinite stream.
    // Starts as [0, 1, 2, ...] and gets shifted by ±slideCount whenever a
    // slide scrolls fully off one edge, so it can reappear on the other.
    const slideStreamIndex = Array.from({ length: slideCount }, (_, i) => i);

    // Swaps a slide slot's image (and its matching title) only when its
    // assigned image number actually changes, to avoid re-triggering
    // image loads / DOM writes every single frame.
    function setSlideImage(index: number, imageNumber: number) {
      const img = imgRefs.current[index];
      if (!img) return;
      if (img.dataset.image === String(imageNumber)) return;
      img.dataset.image = String(imageNumber);
      img.src = slideSrc(imageNumber);

      const titleEl = titleRefs.current[index];
      if (titleEl) titleEl.textContent = slideTitle(imageNumber);
    }

    // `scroll` is the current (eased) scroll position; `scrollTarget` is
    // where input (wheel/drag) wants it to go. `render()` continuously
    // eases `scroll` toward `scrollTarget` each frame (see lerp below),
    // which is what gives the slider its smooth, decelerating feel.
    let scroll = 0;
    let scrollTarget = 0;
    let rafId: number;

    // Mouse wheel / trackpad input. preventDefault stops the page itself
    // from scrolling while the pointer is over the slider.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTarget += (e.deltaY + e.deltaX) * sliderConfig.scrollSpeed * 0.0014;
    };
    slider.addEventListener("wheel", onWheel, { passive: false });

    // Pointer Events cover mouse, touch, and pen in one API — no separate
    // touch handlers needed. Dragging left/right moves scrollTarget.
    let lastPointerX: number | null = null;
    const onPointerDown = (e: PointerEvent) => {
      lastPointerX = e.clientX;
      // Keeps receiving pointermove events even if the pointer leaves the
      // slider's bounds mid-drag (e.g. dragging fast near an edge).
      slider.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (lastPointerX === null) return;
      scrollTarget +=
        (lastPointerX - e.clientX) * sliderConfig.scrollSpeed * 0.005;
      lastPointerX = e.clientX;
    };
    const releasePointer = () => {
      lastPointerX = null;
    };
    slider.addEventListener("pointerdown", onPointerDown);
    slider.addEventListener("pointermove", onPointerMove);
    slider.addEventListener("pointerup", releasePointer);
    slider.addEventListener("pointercancel", releasePointer);

    // Main animation loop — runs once per frame for as long as the
    // component is mounted, recalculating every slide's size and position.
    function render() {
      // Ease `scroll` toward `scrollTarget`. Multiplying the gap by a small
      // constant (lerp) each frame creates the smooth "catching up" motion
      // instead of scroll jumping straight to the target.
      scroll += (scrollTarget - scroll) * sliderConfig.lerp;

      // Read fresh every frame, so window/container resizes are handled
      // automatically without a separate resize listener.
      const sliderWidth = slider!.clientWidth;
      const sliderHeight = slider!.clientHeight;
      const baselineOffset = sliderHeight * sliderConfig.baseline;

      for (let i = 0; i < slideCount; i++) {
        const slideEl = slideRefs.current[i];
        if (!slideEl) continue;

        let streamIndex = slideStreamIndex[i];

        // If this slide has scrolled fully past the right edge, jump it
        // back by slideCount positions so it re-enters from the left (and
        // vice versa) — this is what makes the scroll feel "infinite".
        while (edgeX(streamIndex + scroll, sliderWidth) > sliderWidth)
          streamIndex -= slideCount;
        while (edgeX(streamIndex + scroll + 1, sliderWidth) < 0)
          streamIndex += slideCount;
        slideStreamIndex[i] = streamIndex;

        // Left/right pixel edges of this slide, and the width/height that
        // follow from them (edgeX handles the exponential growth curve).
        const left = Math.round(edgeX(streamIndex + scroll, sliderWidth));
        const right = Math.round(edgeX(streamIndex + scroll + 1, sliderWidth));
        const width = right - left;
        const height = width / sliderConfig.aspect;

        // Which of the fixed source images (1..totalSlides) belongs at
        // this stream position, cycling forever via wrap().
        setSlideImage(i, wrap(streamIndex, sliderConfig.totalSlides) + 1);

        // Direct style writes (not React state) — this runs every frame,
        // so going through React's render cycle here would be too slow.
        slideEl.style.width = `${width}px`;
        slideEl.style.height = `${height}px`;
        // Wider (further right) slides get a higher z-index so they
        // visually overlap slides behind them correctly.
        slideEl.style.zIndex = String(Math.round(right));
        // translate3d (vs. translate) nudges this onto its own GPU
        // compositor layer for smoother animation.
        slideEl.style.transform = `translate3d(${left}px, ${-baselineOffset}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    }

    render();

    // Cleanup on unmount / before the effect re-runs: stop the animation
    // loop and remove every listener added above.
    return () => {
      cancelAnimationFrame(rafId);
      slider.removeEventListener("wheel", onWheel);
      slider.removeEventListener("pointerdown", onPointerDown);
      slider.removeEventListener("pointermove", onPointerMove);
      slider.removeEventListener("pointerup", releasePointer);
      slider.removeEventListener("pointercancel", releasePointer);
    };
  }, [slideCount, growthRatio]);

  return { sliderRef, slideRefs, imgRefs, titleRefs, slideCount };
}
