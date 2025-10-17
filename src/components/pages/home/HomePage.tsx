import { Header, Footer } from '@/components/shared/layout';
import { ContactForm, VideoCarousel } from '@/components/shared/common';
import {
  HeroSection,
  CompanySection,
  ExplainerSection,
  FeatureSection,
  TestimonialSection,
  HowItWorksImageSection,
} from './index';

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <HowItWorksImageSection />
      <VideoCarousel />
      <ExplainerSection />
      <FeatureSection />
      <TestimonialSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
