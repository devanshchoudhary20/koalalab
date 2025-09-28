import { Header, Footer } from '@/components/shared/layout';
import { AboutHero, TeamSection, MissionSection } from './index';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <AboutHero />
      <MissionSection />
      <TeamSection />
      <Footer />
    </div>
  );
}
