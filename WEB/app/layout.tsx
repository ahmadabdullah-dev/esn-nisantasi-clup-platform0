import type { Metadata } from "next";
import { Lato, Oswald } from "next/font/google";
import "./globals.css";

const latoBody = Lato({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const oswaldDisplay = Oswald({
  variable: "--font-esn-display-loaded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ESN Nişantaşı | Erasmus Student Network Türkiye",
  description:
    "ESN Nişantaşı is a local chapter of ESN Türkiye, part of the Erasmus Student Network — connecting international exchange students in Istanbul through events, trips, and cultural exchange.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${latoBody.variable} ${oswaldDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-esn-body">
        {children}
      </body>
    </html>
  );
}
