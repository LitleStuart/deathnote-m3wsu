import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeathNote",
  description: "Death list of skrytopulsk players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
