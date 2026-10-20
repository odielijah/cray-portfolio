import LenisProvider from "./components/providers/lenis-provider";
import ConditionalFooter from "./components/layout/conditional-footer";
import Navbar from "./components/layout/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <LenisProvider>{children}</LenisProvider>
      <ConditionalFooter />
    </>
  );
}