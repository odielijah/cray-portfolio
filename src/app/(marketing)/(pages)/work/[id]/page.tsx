import Image from "next/image";

const content = [
  { id: 1, src: "/images/slide-1.webp" },
  { id: 2, src: "/images/slide-2.webp" },
  { id: 3, src: "/images/slide-5.webp" },
  { id: 4, src: "/images/slide-6.webp" },
  { id: 5, src: "/images/slide-4.webp" },
  { id: 6, src: "/images/slide-3.webp" },
  { id: 7, src: "/images/slide-7.webp" },
];

const Insights = () => {
  return (
    <div className="pt-10 pb-4">
      <h1 className="header-text translate-y-[0.08em] mb-3">Newsroom</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {content.map((item) => (
          <div key={item.id} className="aspect-4/5 overflow-hidden">

            <div key={item.id} className="relative aspect-4/5 overflow-hidden">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;