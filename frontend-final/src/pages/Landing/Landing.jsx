import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import HowItWorks from "../../components/landing/HowItWorks";
import AIBenefits from "../../components/landing/AIBenefits";
import Statistics from "../../components/landing/Statistics";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/layout/Footer";

function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
       <AIBenefits />
      <Statistics />
      <CTA />
      <Footer/>
    </main>
  );
}

export default Landing;