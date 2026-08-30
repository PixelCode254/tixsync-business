import { Hero } from "@/components/public/hero";
import { Stats } from "@/components/public/stats";
import { Services } from "@/components/public/services";
import { Portfolio } from "@/components/public/portfolio";
import { Testimonials } from "@/components/public/testimonials";
import { CTA } from "@/components/public/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
    </>
  );
}
