import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Founders from "@/components/sections/Founders";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import PremiumBranding from "@/components/sections/PremiumBranding";
import Lab from "@/components/sections/Lab";
import Growth from "@/components/sections/Growth";
import Pricing from "@/components/sections/Pricing";
import Clients from "@/components/sections/Clients";
import Journal from "@/components/sections/Journal";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Founders />
      <Services />
      <Work />
      <PremiumBranding />
      <Pricing />
      <Lab />
      <Growth />
      <Testimonials />
      <Journal />
      <Clients />
      <Contact />
    </>
  );
}
