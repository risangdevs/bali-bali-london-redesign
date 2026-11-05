import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bali Bali — A Journey to the Indonesian Table",
  description:
    "Authentic Indonesian dining in London’s West End. A family-run restaurant since 1986. Explore the table, discover rijsttafel, and plan your visit.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
