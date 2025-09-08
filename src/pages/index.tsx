import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import CompanySection from "@/components/sections/CompanySection";
import ExplainerSection from "@/components/sections/ExplainerSection";
import FeatureSection from "@/components/sections/FeatureSection";
import HowItWorksContentSection from "@/components/sections/HowItWorksContentSection";
import HowItWorksImageSection from "@/components/sections/HowItWorksImageSection";
import ContactForm from "@/components/sections/ContactForm";
export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CompanySection />
      <ExplainerSection />
      <FeatureSection />
      <HowItWorksImageSection />
      <ContactForm />
      <HowItWorksContentSection />
    </div>
  );
}
