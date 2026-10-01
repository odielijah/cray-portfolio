import Image from "next/image";
import { MoveRight } from "lucide-react";

const contactLinks = [
  {
    label: "contact@detroit-talents.com",
    href: "mailto:contact@detroit-talents.com",
  },
  {
    label: "job@detroit-talents.com",
    href: "mailto:job@detroit-talents.com",
  },
  {
    label: "+33 6 74 18 02 68",
    href: "tel:+33674180268",
  },
];

const socialLinks = [
  {
    label: "instagram",
    href: "https://www.instagram.com/detroit__paris/",
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/company/detroit-talents/",
  },
  {
    label: "newsletter",
    href: "#",
  },
];

const locations = [
  {
    city: "paris",
    address: "49 rue du faubourg Saint Martin, 75010 Paris",
    href: "https://maps.app.goo.gl/5Agc4dPvnmwJDdoH9",
  },
  {
    city: "marseille",
    address: "4 place Francis Chirat, 13002 Marseille",
    href: "https://maps.app.goo.gl/qEr5MuSHGP9jgWoS8",
  },
];

const Dot = () => (
  <span
    aria-hidden="true"
    className="h-2 w-2 shrink-0 rounded-full bg-current"
  />
);

const FooterLink = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="group flex w-fit items-center gap-2 uppercase transition-opacity hover:opacity-50"
  >
    <Dot />
    <span>{label}</span>
  </a>
);

const Location = ({
  city,
  address,
  href,
}: {
  city: string;
  address: string;
  href: string;
}) => (
  <address className="not-italic">
    <div className="mb-2 flex font-bold items-center gap-2 text-base uppercase">
      <MoveRight size={18} strokeWidth={1} />
      <span>{city}</span>
    </div>

    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block uppercase leading-relaxed transition-opacity hover:opacity-50"
    >
      {address}
    </a>
  </address>
);

const Footer = () => {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden pt-20 md:pt-28 flex flex-col gap-1"
    >
      <div className="min-h-50 pl-6 grid grid-cols-1 gap-16 text-[12px] md:grid-cols-4 md:gap-8">
        {/* Brand */}
        <div className="flex flex-col justify-between md:col-span-2">
          <h2 className="max-w-130 font-heading text-6xl uppercase leading-[0.8] tracking-[-0.02em] md:text-8xl">
            <span>Join the culture</span>
            <span className="flex items-center gap-4">
              crafters
              <Image
                src="/images/esen.webp"
                alt=""
                width={65}
                height={58}
                className=""
              />
            </span>
          </h2>

          <p className="uppercase">© All right reserved. 2026 Detroit</p>
        </div>

        {/* Contact + Socials */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {contactLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {socialLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="flex flex-col justify-between">
          {locations.map((location) => (
            <Location key={location.city} {...location} />
          ))}
        </div>
      </div>

      {/* Giant Wordmark */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox="0 0 1711 357"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative left-1/2 w-[1800px] translate-x-[-52%] translate-y-18 md:w-[1800px] transition-all duration-700"
          aria-label="Detroit"
        >
          <g>
            <path
              className="hover:translate-y-25"
              d="M297.428 0C408.207 0 418.717 73.4613 378.978 171.923C334.943 280.846 234.598 349.923 136.862 349.923H0L2.14844 344.692L34.9062 341.615L195.396 8.76953L162.255 5.23047L164.403 0H297.428ZM86.3828 342.074H129.574C203.758 342.074 288.837 256.766 330.264 167.074C362.561 97.5357 366.013 8.30469 291.905 8.30469H246.949L86.3828 342.074Z"
              fill="currentColor"
            />

            <path
              className="hover:translate-y-25"
              d="M334.559 344.69L365.552 342.075L482.468 86.6129L451.091 83.0743L453.239 77.8438H658.301L621.247 159.229H616.031C629.533 123.767 636.514 86.1513 594.243 86.1513H528.344L476.024 200.306H510.086C531.873 200.306 553.737 175.844 563.327 155.229H568.543L522.744 254.921H517.527C524.508 236.998 531.029 211.152 511.85 211.152H471.728L411.045 341.921H473.876C517.911 341.921 549.364 298.613 571.612 257.921H576.829L534.481 349.767H332.488L334.636 344.536L334.559 344.69Z"
              fill="currentColor"
            />

            <path
              className="hover:translate-y-25"
              d="M622.933 344.692L647.789 342.923L737.24 158.308H718.905C695.353 158.308 670.881 185.385 659.603 211.692H654.387L681.007 150H844.566L814.877 211.692H809.66C819.71 188.077 827.995 158.308 802.219 158.308H780.431L690.98 342.923L714.992 344.692L712.844 349.923H620.785L623.01 344.692H622.933Z"
              fill="currentColor"
            />

            <path
              className="hover:translate-y-15"
              d="M961.867 186.844C999.381 186.844 1029.91 199.075 1029.91 223.151C1029.91 248.997 988.872 265.612 967.545 265.612C992.401 269.997 1008.13 274.844 1021.17 300.612C1036.9 331.228 1055.61 349.152 1072.19 351.767L1070.04 356.998C1023.78 356.998 1004.14 347.382 981.891 307.151C967.928 281.767 940.004 269.075 914.304 269.075H895.125L860.679 343.46L879.857 344.767L877.71 349.998H798.309L800.457 344.767L800.533 344.689L819.713 343.383L889.524 192.921L869.425 192.075L871.572 186.844H961.867ZM952.738 195.078C944.913 195.078 937.011 195.078 929.187 195.539L899.113 260.31H931.871L931.794 260.232C960.563 260.232 992.86 248.386 992.86 221.771C992.86 205.156 974.985 195.078 952.738 195.078Z"
              fill="currentColor"
            />

            <path
              className="hover:translate-y-25"
              d="M1146.45 145.695C1216.26 145.695 1261.21 192.926 1284.77 255.465C1303.94 306.618 1295.2 356.927 1231.52 356.927C1150.82 356.927 1097.58 300.465 1078.86 244.08C1060.98 189.003 1086.68 145.695 1146.45 145.695ZM1143.38 155.695C1105.02 155.695 1104.56 200.311 1113.3 230.465C1130.34 289.541 1173.53 347.234 1228.92 347.234L1229.81 347.302C1267.13 346.486 1258.51 294.105 1246.79 258.08C1228.92 202.541 1187.03 155.695 1143.38 155.695Z"
              fill="currentColor"
            />

            <path
              className="hover:translate-y-25"
              d="M1344.53 77.8438L1346.68 83.0743L1316.99 86.1513L1440.04 341.613L1469.73 344.229L1471.49 349.921H1364.17L1362.86 344.229L1394.24 341.613L1271.65 85.6897L1240.27 83.0743L1238.12 77.8438H1344.6H1344.53Z"
              fill="currentColor"
            />

            <path
              className="hover:translate-y-25"
              d="M1625 0L1672.57 101.923H1667.35C1637.66 42.4615 1591.4 8.30769 1550.89 8.30769H1515.14L1676.09 341.615L1708.85 344.692L1711 349.923H1594.08L1591.94 344.692L1624.69 341.615L1463.59 8.30769H1421.7C1375.44 8.30769 1385.49 58.6154 1402.06 101.923H1396.85L1349.74 0H1625Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;
