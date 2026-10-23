import Link from "next/link";
import Logo from "@/app/(marketing)/components/shared/logo";

const rightLinksData = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
];

export function RightLinks() {
  return (
    <div className="flex items-center justify-end gap-[3vw]">
      {rightLinksData.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="pointer-events-auto text-md"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default function Navbar() {
  return (
    <>
      {/* Blended layer: links only */}
      <header className="pointer-events-none fixed z-99 flex min-h-14 w-full items-center px-6 py-5 text-white mix-blend-difference">
        <nav className="flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-[5vw]">
            {/* Invisible spacer so links stay where they were */}
            <div className="invisible w-13" aria-hidden>
              <Logo />
            </div>
          </div>

          <RightLinks />
        </nav>
      </header>

      {/* Unblended layer: the real logo */}
      <div className="pointer-events-none fixed left-6 top-0 z-100 flex min-h-14 items-center py-5">
        <Link href="/" className="pointer-events-auto w-13">
          <Logo />
        </Link>
      </div>
    </>
  );
}
