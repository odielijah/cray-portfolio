export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="px-6 pt-20">{children}</main>;
}
