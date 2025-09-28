import { CompaniesCarousel } from '@/components/shared/common';

export default function BackedBySection() {
  return (
    <section className="bg-primary-background_brown py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-6xl font-bold text-primary-text_brown text-center mb-8">
          Backed By
        </h2>
        <CompaniesCarousel />
      </div>
    </section>
  );
}
