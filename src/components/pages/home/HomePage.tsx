import { Header, Footer } from '@/components/shared/layout';
import { ContactForm } from '@/components/shared/common';
import {
  HeroSection,
  CompanySection,
  ExplainerSection,
  FeatureSection,
  TestimonialSection,
  HowItWorksContentSection,
  HowItWorksImageSection,
} from './index';

export default function HomePage() {
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
      <Footer />
    </div>
  );
}
