import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Life Expansion",
  description:
    "Life Expansion is a platform that focuses on work efficiency, getting back your time by bringing all your work, ideas to an oragnized place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">{children}</body>
    </html>
  );
}
