import Image from 'next/image';


export default function AboutHero() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/ExplainerBackground.webp"
          alt="Background"
          fill
          className="object-cover"
          quality={85}
          sizes="100vw"
          priority
        />
      </div>
      <div className="relative container mx-auto px-4">
        <h1 className="text-6xl font-bold text-white text-center font-heading">
          About Us
        </h1>
        <p className="text-lg text-white text-center mt-7 max-w-3xl mx-auto font-content">
        Get to know more about the team at Koala Labs
        </p>
      </div>
    </section>
  );
}
