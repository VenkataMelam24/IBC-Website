import type { Metadata } from "next";
import { BrandStorySection } from "@/components/sections/brand-story-section";
import { OrderOnlineSection } from "@/components/sections/order-online-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SignatureDishesSection } from "@/components/sections/signature-dishes-section";

export const metadata: Metadata = {
  title: "Indian Biryani Company Berlin — Authentic Biryani & Catering",
  description:
    "Experience Berlin's best Indian food at Indian Biryani Company, Charlottenburg. Authentic dum biryani, grills, curries, and full catering for events.",
  alternates: { canonical: "https://theibc.de" },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Indian Biryani Company",
  image: "https://theibc.de/images/hero-biryani.png",
  url: "https://theibc.de",
  telephone: "+4917737771839",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hektorstraße 11",
    addressLocality: "Berlin",
    postalCode: "10711",
    addressCountry: "DE",
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
  servesCuisine: ["Indian", "Biryani"],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Cash, Credit Card",
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
