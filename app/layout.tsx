import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CitePatch — Fix the page AI skipped",
  description: "Demo citation-gap triage for small SaaS teams."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
