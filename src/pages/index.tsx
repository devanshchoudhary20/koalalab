import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import CompanySection from "@/components/sections/CompanySection";
import ExplainerSection from "@/components/sections/ExplainerSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <CompanySection />
      <ExplainerSection />
    </div>
  );
}
