import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TypeQuest Typing Speed Test",
  description: "A frontend-only typing speed test game with local leaderboard storage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
