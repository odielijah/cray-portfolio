"use client";

import { usePathname } from "next/navigation";

import Footer from "./footer";

const ConditionalFooter = () => {
  const pathname = usePathname();

  const showFooter = pathname === "/insights" || pathname === "/services";

  if (!showFooter) return null;

  return <Footer />;
};

export default ConditionalFooter;
