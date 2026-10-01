import Link from "next/link";
import Logo from "@/app/(marketing)/components/shared/logo";

const leftLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
];

const rightLinks = [
  { label: "Merch", href: "/merch" },
  { label: "People", href: "/people" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed z-99 flex min-h-14 w-full items-center px-6 py-5 text-sm uppercase text-white mix-blend-difference">
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center justify-start gap-[6vw]">
          <Link href="/" className="pointer-events-auto w-13">
            <Logo />
          </Link>

          {leftLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="pointer-events-auto text-[12.5px]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-[6vw]">
          {rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="pointer-events-auto text-[12.5px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
