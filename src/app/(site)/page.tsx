import type { Metadata } from "next";
import { BrandStorySection } from "@/components/sections/brand-story-section";
import { OrderOnlineSection } from "@/components/sections/order-online-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SignatureDishesSection } from "@/components/sections/signature-dishes-section";

export const metadata: Metadata = {
  title: "IBC – Indian Biryani Company Berlin | Authentic Biryani & Catering",
  description:
    "IBC (Indian Biryani Company) — Berlin's authentic Indian restaurant in Charlottenburg. Dum biryani, grills, curries, and full catering for events & weddings.",
  alternates: { canonical: "https://theibc.de" },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://theibc.de/#restaurant",
  name: "Indian Biryani Company",
  alternateName: ["IBC", "IBC Berlin", "Indian Biryani Company Berlin"],
  description:
    "IBC – Indian Biryani Company is Berlin's authentic Indian restaurant in Charlottenburg, specialising in dum biryani, curries, and catering for events.",
  image: [
    "https://theibc.de/images/hero-biryani.png",
    "https://theibc.de/images/logo-new.png",
  ],
  logo: "https://theibc.de/images/logo-new.png",
  url: "https://theibc.de",
  menu: "https://theibc.de/menu",
  hasMap: "https://maps.google.com/?q=Hektorstraße+11,+10711+Berlin",
  telephone: "+4917737771839",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hektorstraße 11",
    addressLocality: "Berlin",
    postalCode: "10711",
    addressCountry: "DE",
    addressRegion: "Berlin",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.4977,
    longitude: 13.3006,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
      opens: "16:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "22:00",
    },
  ],
  servesCuisine: ["Indian", "Biryani", "Hyderabadi", "South Indian"],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
  areaServed: {
    "@type": "City",
    name: "Berlin",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <HeroSection />
      <BrandStorySection />
      <SignatureDishesSection />
      <OrderOnlineSection />
    </>
  );
}
