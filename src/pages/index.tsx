import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import CompanySection from "@/components/sections/CompanySection";
import ExplainerSection from "@/components/sections/ExplainerSection";
import FeatureSection from "@/components/sections/FeatureSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CompanySection />
      <ExplainerSection />
      <FeatureSection />
    </div>
  );
}
