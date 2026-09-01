import Link from "next/link";

const jobOpenings = [
  {
    title: "Growth Director",
    href: "#",
  },
  {
    title: "Senior Motion Designer",
    href: "#",
  },
  {
    title: "Strategic Marketing (Intern)",
    href: "#",
  },
];

const footerColumns = [
  {
    links: [
      {
        label: "Contact@detroit-talents.com",
        href: "mailto:contact@detroit-talents.com",
      },
      {
        label: "Job@detroit-talents.com",
        href: "mailto:job@detroit-talents.com",
      },
    ],
  },
  {
    links: [
      {
        label: "Instagram",
        href: "#",
      },
      {
        label: "LinkedIn",
        href: "#",
      },
    ],
  },
  {
    links: [
      {
        label: "Legals",
        href: "#",
      },
      {
        label: "Newsletter",
        href: "#",
      },
    ],
  },
];

function JobOpenings() {
  return (
    <div className="flex flex-col gap-4 leading-[0.8] pb-8">
      {jobOpenings.map((job) => (
        <div key={job.title} className="flex flex-col gap-1">
          <h3 className="text-xs font-medium">{job.title}</h3>
          <Link
            href={job.href}
            className="text-xs transition-colors hover:text-black"
          >
            Apply
          </Link>
        </div>
      ))}
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="flex flex-wrap gap-30">
      {footerColumns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {column.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[10px] font-medium tracking-wide hover:underline hover:underline-offset-4 md:text-xs"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

function BrandHeading() {
  return (
    <h2 className="flex flex-col text-right header-text">
      <span>The</span>
      <span>Kultur3</span>
      <span>Kraft3rs</span>
    </h2>
  );
}

export default function Contact() {
  return (
    <div className="grid pt-10 grid-cols-1 gap-x-8 overflow-x-hidden uppercase md:grid-cols-2 md:gap-y-32">
      {/* top-left */}
      <div className="flex flex-col justify-between gap-16">
        <h1 className="header-text">Join</h1>
        <JobOpenings />
      </div>

      {/* top-right */}
      <div className="flex justify-end">
        <BrandHeading />
      </div>

      {/* bottom-left */}
      <div className="self-end">
        <FooterLinks />
      </div>

      {/* bottom-right */}
      <div className="flex items-end justify-end self-end">
        <p className="max-w-md text-right text-[10px] normal-case md:text-xs">
          Europe&apos;s leading AI production house, technological craftsmanship
          drives images, films, and experiences with cultural, business, and
          sustainable impact. We help luxury brands enter a new era of augmented
          creation, where innovation fuels desirability.
        </p>
      </div>
    </div>
  );
}
