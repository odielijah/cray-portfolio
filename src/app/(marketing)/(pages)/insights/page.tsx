"use client";
import { useState } from "react";

const tabs = ["All", "Articles", "Books"];

const content = [
  { id: 1, content: "/images/slide-1.webp", type: "Articles" },
  { id: 2, content: "/images/slide-2.webp", type: "Books" },
  { id: 3, content: "/images/slide-3.webp", type: "Articles" },
  { id: 4, content: "/images/slide-4.webp", type: "Books" },
  { id: 5, content: "/images/slide-5.webp", type: "Articles" },
  { id: 6, content: "/images/slide-6.webp", type: "Books" },
  { id: 7, content: "/images/slide-7.webp", type: "Articles" },
];
function getSpans(count: number): number[] {
  const patterns = [
    [3, 3],
    [2, 2, 2],
  ];
  const spans: number[] = [];
  let i = 0;
  let patternIndex = 0;

  while (i < count) {
    const pattern = patterns[patternIndex % patterns.length];
    const remaining = count - i;

    if (remaining >= pattern.length) {
      spans.push(...pattern);
      i += pattern.length;
    } else if (remaining === 1) {
      spans.push(6);
      i += 1;
    } else {
      spans.push(3, 3);
      i += 2;
    }

    patternIndex++;
  }

  return spans;
}

const spanClass = (n: number) =>
  n === 2 ? "col-span-2" : n === 3 ? "col-span-3" : "col-span-6";

const aspectClass = (n: number) => {
  if (n === 3) return "aspect-[4/5]"; // pair-row images
  if (n === 6) return "aspect-[21/9]"; // lone full-width image, kept short
  return "aspect-[4/5]"; // triple-row images
};

const Insights = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredContent =
    activeTab === "All"
      ? content
      : content.filter((item) => item.type === activeTab);

  const spans = getSpans(filteredContent.length);

  return (
    <div>
      <div className="pt-10 pb-4">
        <div className="flex gap-[3rem] items-center">
          <h1 className="header-text leading-[100%]">Newsroom</h1>

          <div className="flex gap-[3rem]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`transition-colors duration-300 uppercase text-[13px] ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6">
          {filteredContent.map((item, index) => (
            <div
              key={item.id}
              className={`${spanClass(spans[index])} ${aspectClass(spans[index])} overflow-hidden`}
            >
              {/* eslint-disable-next-line */}
              <img
                src={item.content}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
