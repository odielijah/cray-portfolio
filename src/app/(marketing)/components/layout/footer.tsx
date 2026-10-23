"use client";
import {
  RiInstagramFill,
  RiTwitterFill,
  RiLinkedinFill,
} from "@remixicon/react";
import { ChevronsUp } from "lucide-react";

type FooterLink = { label: string; href: string };

const contactInfo: FooterLink[] = [
  {
    label: "contact@detroit-talents.com",
    href: "mailto:contact@detroit-talents.com",
  },
  { label: "job@detroit-talents.com", href: "mailto:job@detroit-talents.com" },
  { label: "+33 6 74 18 02 68", href: "tel:+33674180268" },
];

const sitemapColumns: FooterLink[][] = [
  [
    { label: "Index", href: "/" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  [
    { label: "Studio", href: "/studio" },
    { label: "Archive", href: "/archive" },
    { label: "Contact", href: "/contact" },
  ],
  [
    { label: "Page 404", href: "/404" },
    { label: "Terms", href: "/terms" },
    { label: "Help Center", href: "/help" },
  ],
];

const socialLinks = [
  {
    label: "linkedin",
    icon: RiLinkedinFill,
    href: "https://www.linkedin.com/company/detroit-talents/",
  },
  { label: "twitter", icon: RiTwitterFill, href: "https://twitter.com/" },
  {
    label: "instagram",
    icon: RiInstagramFill,
    href: "https://www.instagram.com/detroit__paris/",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const LinkList = ({ links }: { links: FooterLink[] }) => (
  <ul className="flex flex-col">
    {links.map(({ label, href }) => (
      <li key={label}>
        <a href={href} className="footer-link">
          {label}
        </a>
      </li>
    ))}
  </ul>
);

const Footer = () => {
  return (
    <footer
      id="footer"
      className="footer px-6 relative flex h-dvh flex-col overflow-hidden pt-20 md:pt-28"
    >
      <div className="grid min-h-50 grid-cols-1 gap-16 text-[12px] md:grid-cols-4 md:gap-8">
        {/* Brand + info */}
        <div className="flex flex-col gap-16 md:col-span-4">
          <h1 className="text-[70px] max-w-sm leading-[0.8] tracking-tighter font-bold">
            Let&apos;s start from nothin
          </h1>

          <div className="grid grid-cols-1 gap-12 border-t border-current/20 pt-10 text-[16px] md:grid-cols-2">
            <div className="footer-section">
              <h2 className="footer-heading">Work with Us</h2>
              <LinkList links={contactInfo} />
            </div>

            <div className="footer-section">
              <h2 className="footer-heading">Sitemap</h2>
              <div className="grid grid-cols-3 gap-8">
                {sitemapColumns.map((column, i) => (
                  <LinkList key={i} links={column} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Wordmark */}
      <div className="mt-auto flex flex-col w-full justify-center overflow-visible text-center">
        <div className="flex justify-between mb-2 mr-1">
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-link flex gap-4 items-center cursor-pointer"
          >
            Scroll back to top
            <ChevronsUp className="w-4.5 h-4.5 mt-1" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="footer-link capitalize"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <h1 aria-hidden="true" className="footer-wordmark">
          C<span className="footer-wordmark-flip mr-[-0.02em]">r</span>
          ay Creativ
          <span className="footer-wordmark-flip ml-[0.02em]">e</span>
        </h1>

        <div className="flex justify-end gap-7 my-2 mr-1">
          <span>2026 &copy; Cray Creative. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
