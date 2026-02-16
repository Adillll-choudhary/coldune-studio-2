import Hero from "@/components/sections/Hero";
import dynamic from 'next/dynamic';

const About = dynamic(() => import("@/components/sections/About"));
const Founders = dynamic(() => import("@/components/sections/Founders"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Work = dynamic(() => import("@/components/sections/Work"));
const PremiumBranding = dynamic(() => import("@/components/sections/PremiumBranding"));
const Lab = dynamic(() => import("@/components/sections/Lab"));
const Growth = dynamic(() => import("@/components/sections/Growth"));
const Pricing = dynamic(() => import("@/components/sections/Pricing"));
const Clients = dynamic(() => import("@/components/sections/Clients"));
const Journal = dynamic(() => import("@/components/sections/Journal"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Clients />
      <Founders />
      <Services />
      <Work />
      <PremiumBranding />
      <Pricing />
      <Lab />
      <Growth />
      <Testimonials />
      <Journal />
      <Contact />
    </>
  );
}
