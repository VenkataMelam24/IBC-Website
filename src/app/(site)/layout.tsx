import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://theibc.de"),
  title: {
    default: "IBC – Indian Biryani Company Berlin | Authentic Biryani & Catering",
    template: "%s | IBC – Indian Biryani Company Berlin",
  },
  description:
    "IBC (Indian Biryani Company) — Berlin's favourite Indian restaurant in Charlottenburg. Authentic dum biryani, catering for events & weddings, delivery via Uber Eats, Lieferando & Wolt.",
  keywords: [
    "IBC Berlin",
    "IBC Indian restaurant",
    "Indian Biryani Company",
    "Indian Biryani Company Berlin",
    "Indian restaurant Berlin",
    "biryani Berlin",
    "Indian food Berlin",
    "catering Berlin",
    "dum biryani",
    "Indian catering Berlin",
    "Charlottenburg restaurant",
    "theibc.de",
  ],
  openGraph: {
    type: "website",
    locale: "en_DE",
    url: "https://theibc.de",
    siteName: "IBC – Indian Biryani Company Berlin",
    title: "IBC – Indian Biryani Company Berlin | Authentic Biryani & Catering",
    description:
      "IBC (Indian Biryani Company) — Berlin's favourite Indian restaurant. Authentic dum biryani, catering for events, and online delivery.",
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
