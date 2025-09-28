import { Header, Footer } from '@/components/shared/layout';
import { AboutHero, TeamSection, AdvisorsSection, BackedBySection, PreviousAssociation } from './index';
import { ContactForm } from '@/components/shared/common';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <AboutHero />
      <TeamSection />
      <PreviousAssociation />
      <BackedBySection />
      <AdvisorsSection />
      <ContactForm />
      <Footer />
    </div>
  );
}
