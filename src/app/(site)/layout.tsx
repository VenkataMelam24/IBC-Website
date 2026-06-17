import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://theibc.de"),
  title: {
    default: "Indian Biryani Company Berlin — Authentic Biryani & Catering",
    template: "%s | Indian Biryani Company Berlin",
  },
  description:
    "Berlin's favourite Indian restaurant. Authentic dum biryani, catering for events, and online delivery via Uber Eats, Lieferando & Wolt. Located in Charlottenburg.",
  keywords: [
    "Indian restaurant Berlin",
    "biryani Berlin",
    "Indian food Berlin",
    "catering Berlin",
    "dum biryani",
    "Indian catering Berlin",
    "Charlottenburg restaurant",
    "halal Berlin",
  ],
  openGraph: {
    type: "website",
    locale: "en_DE",
    url: "https://theibc.de",
    siteName: "Indian Biryani Company Berlin",
    title: "Indian Biryani Company Berlin — Authentic Biryani & Catering",
    description:
      "Berlin's favourite Indian restaurant. Authentic dum biryani, catering for events, and online delivery.",
    images: [
      {
        url: "/images/hero-biryani.png",
        width: 1200,
        height: 630,
        alt: "Indian Biryani Company Berlin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Indian Biryani Company Berlin",
    description: "Authentic dum biryani & catering in Berlin, Charlottenburg.",
    images: ["/images/hero-biryani.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
