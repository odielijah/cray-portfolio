"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { projects } from "@/app/(marketing)/constants/projects";

const loopedprojects = [...projects, ...projects, ...projects];

export default function ProjectRoster() {
  const activeRef = useRef<HTMLDivElement | null>(null);
  const isResettingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(() =>
    projects.length
      ? projects.length + Math.floor(Math.random() * projects.length)
      : 0,
  );

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeproject = loopedprojects[activeIndex];

  /*
   * Scroll to the active project.
   */
  useEffect(() => {
    if (!activeRef.current) return;

    activeRef.current.scrollIntoView({
      behavior: isResettingRef.current ? "instant" : "smooth",
      block: "center",
    });

    isResettingRef.current = false;
  }, [activeIndex]);

  /*
   * Automatically change the active project.
   */
  useEffect(() => {
    if (!projects.length) return;

    const interval = setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;

        /*
         * We've reached the end of the middle copy.
         *
         * Jump back to the equivalent item
         * in the middle copy without animation.
         */
        if (nextIndex >= projects.length * 2) {
          isResettingRef.current = true;

          return projects.length;
        }

        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex w-full relative">
      {/* project roster */}
      <div className="w-full flex flex-col relative z-10 scrollbar-none">
        {loopedprojects.map((project, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;

          return (
            <div
              ref={isActive ? activeRef : null}
              key={`${project.id}-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center relative cursor-pointer transition-opacity duration-300 ease-in-out ${
                isActive || isHovered ? "opacity-100" : "opacity-10"
              }`}
            >
              {/* Left column */}
              <h1 className="header-text text-[10rem]">{project.name}</h1>

              {/* Middle column */}
              <div className="absolute top-1/2 -translate-y-1/2 left-[55%]">
                <p className="text-[13px] uppercase text-foreground whitespace-nowrap">
                  {project.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right column */}
      <div className="relative">
        <div className="transition-opacity duration-500 ease-in-out w-full h-full">
          {/* Top image */}
          <div className="fixed top-0 right-0 w-25 h-25 overflow-hidden z-10">
            <Image
              src={activeproject?.image ?? ""}
              alt={activeproject?.name ?? ""}
              fill
              className="object-cover object-center grayscale-20"
            />
          </div>

          {/* Image */}
          <div className="fixed top-[10%] right-0 w-70 h-70 overflow-hidden z-20">
            <Image
              src={activeproject?.image ?? ""}
              alt={activeproject?.name ?? ""}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Image */}
          <div className="fixed top-[38.5%] right-0 w-95 h-75 overflow-hidden z-20">
            <Image
              src={activeproject?.image ?? ""}
              alt={activeproject?.name ?? ""}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Bottom image */}
          <div className="fixed bottom-0 right-0 w-125 h-75 overflow-hidden z-30">
            <Image
              src={activeproject?.image ?? ""}
              alt={activeproject?.name ?? ""}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
