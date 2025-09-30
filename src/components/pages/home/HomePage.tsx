import { Header, Footer } from '@/components/shared/layout';
import { ContactForm, VideoCarousel } from '@/components/shared/common';
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
      <VideoCarousel />
      <HowItWorksImageSection />
      <ContactForm />
      <HowItWorksContentSection />
      <Footer />
    </div>
  );
}
