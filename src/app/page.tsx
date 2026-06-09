import { BrandStorySection } from "@/components/sections/brand-story-section";
import { OrderOnlineSection } from "@/components/sections/order-online-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SignatureDishesSection } from "@/components/sections/signature-dishes-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <SignatureDishesSection />
      <OrderOnlineSection />
    </>
  );
}
