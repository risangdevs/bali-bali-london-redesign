import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Bali Bali | A journey to the Indonesian table",
  description:
    "Family-run Indonesian restaurant on Shaftesbury Avenue in London's West End, established in 1986. View the menu and book a table.",
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
