import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import CompanySection from "@/components/sections/CompanySection";
import ExplainerSection from "@/components/sections/ExplainerSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import HowItWorksContentSection from "@/components/sections/HowItWorksContentSection";
import HowItWorksImageSection from "@/components/sections/HowItWorksImageSection";
import ContactForm from "@/components/sections/ContactForm";
import FooterSection from "@/components/sections/FooterSection";
import FeatureSection from "@/components/sections/FeatureSection";
export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CompanySection />
      <ExplainerSection />
      <FeatureSection />
      <TestimonialSection />
      <HowItWorksImageSection />
      <ContactForm />
      <HowItWorksContentSection />
      <FooterSection />
    </div>
  );
}
