import { Hero } from "@/components/site/hero";
import { PressMarquee } from "@/components/site/press-marquee";
import { HomeHighlights } from "@/components/site/home-highlights";
import { HomeMission } from "@/components/site/home-mission";
import { FeaturedReel } from "@/components/site/featured-reel";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBand } from "@/components/site/cta-band";

export default function Home() {
  return (
    <>
      <Hero />
      <PressMarquee />
      <HomeHighlights />
      <HomeMission />
      <FeaturedReel />
      <Testimonials />
      <CtaBand
        title="Bring Nkrabea to your stage"
        description="Book a performance, commission a workshop, or partner with us to fund the next generation of Ghanaian artists."
        primaryLabel="Start a booking"
        primaryHref="/bookings"
        secondaryLabel="Contact the ensemble"
        secondaryHref="/contact"
      />
    </>
  );
}
