"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronsDown, ChevronDown } from "lucide-react";
import Link from "next/link";

const content = [
  {
    id: 1,
    src: "/images/slide-1.webp",
    title: "Festival Experience",
    category: "Festival",
  },
  {
    id: 2,
    src: "/images/slide-2.webp",
    title: "Visual Stories",
    category: "Photography",
  },
  {
    id: 3,
    src: "/images/slide-5.webp",
    title: "Motion Pictures",
    category: "Videography",
  },
  {
    id: 4,
    src: "/images/slide-6.webp",
    title: "Identity Design",
    category: "Branding",
  },
  {
    id: 5,
    src: "/images/slide-4.webp",
    title: "Digital Experiences",
    category: "Web Design",
  },
  {
    id: 6,
    src: "/images/slide-3.webp",
    title: "Frames of Life",
    category: "Photography",
  },
  {
    id: 7,
    src: "/images/slide-7.webp",
    title: "Culture in Motion",
    category: "Festival",
  },
  {
    id: 8,
    src: "/images/slide-11.webp",
    title: "Brand Language",
    category: "Branding",
  },
  {
    id: 9,
    src: "/images/slide-9.webp",
    title: "Moving Images",
    category: "Videography",
  },
];

const categories = [
  "All Work",
  ...Array.from(new Set(content.map((item) => item.category))),
];

const Work = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredContent =
    activeCategory === "All Work"
      ? content
      : content.filter((item) => item.category === activeCategory);

  return (
    <div className="relative pt-10 pb-4 flex flex-col gap-5">
      <div className="flex justify-between items-end mb-20">
        <h1 className="flex flex-col header-text translate-y-[0.08em]">
          <span>Our</span>
          <div>
            Wor<span className="inline-block -scale-x-100">k</span>
          </div>
        </h1>
        <p className="w-130 mr-10 text-xl mb-1">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
          temporibus dolorum nostrum sit doloribus nam scum. Odit, autem
          doloribus delectus?
        </p>
      </div>

      <h2 className="text-3xl font-bold">2020 - Present</h2>
      <div className="bg-black/10 h-px my-5" />

      <div className="grid grid-cols-2 gap-6 justify-center mb-15 text-lg">
        <div>
          <button
            className="flex items-center gap-4 cursor-pointer"
            onClick={() =>
              document.getElementById("work-grid")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Scroll to Explore
            <ChevronsDown className="w-5 h-5 mt-1" strokeWidth={1.5} />
          </button>
        </div>

        <div>
          <button
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setOpenDropdown((prev) => !prev)}
          >
            Categories
            <ChevronDown className="w-5 h-5 mt-1" strokeWidth={1.5} />
          </button>
        </div>

        {openDropdown && (
          <div className="font-heading col-start-2 py-5 text-6xl max-w-150">
            {categories.map((category, index) => (
              <span key={category}>
                <button
                  className={`cursor-pointer ${
                    activeCategory === category
                      ? "underline"
                      : "text-foreground/20"
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                  }}
                >
                  {category}
                </button>
                {index < categories.length - 1 && (
                  <span
                    className={
                      activeCategory === category
                        ? "text-foreground"
                        : "text-foreground/20"
                    }
                  >
                    ,{" "}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        id="work-grid"
        className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10"
      >
        {filteredContent.map((item) => (
          <div key={item.id} className="group">
            <span className="pb-3 flex justify-start">
              {String(item.id).padStart(2, "0")}
            </span>

            <Link
              href={`/work/${item.id}`}
              className="group relative block aspect-4/5 overflow-hidden cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </Link>

            <div className="flex items-center justify-between pt-3">
              <span className="">{item.title}</span>
              <h3 className="text-foreground/50">{item.category}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
