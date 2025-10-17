import { CompaniesCarousel } from '@/components/shared/common';

export default function BackedBySection() {
  return (
    <section className="bg-primary-background_brown section-padding">
      <div className="section-container">
        <h2 className="text-heading-large text-primary-text_brown text-center mb-8">
          Backed By
        </h2>
        <CompaniesCarousel />
      </div>
    </section>
  );
}
