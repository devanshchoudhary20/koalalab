import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Tab = {
 id: string;
 label: "Accelerate" | "Manage" | "Secure";
 title: string;
 description: string;
 cta1: string;
 cta2: string;
 image: string;
};

const TAB_DATA: Tab[] = [
  {
    id: "accelerate",
    label: "Accelerate",
    title: "Accelerate your compliance.",
    description:
      "Get FedRAMP and PCI-DSS ready with hardened containers—cut compliance timelines and streamline your security posture.",
    cta1: "View libraries →",
    cta2: "Learn More →",
    image: "/images/Accelerate.webp",
  },
  {
    id: "manage",
    label: "Manage",
    title: "Manage your infrastructure.",
    description:
      "Centralized control and monitoring for all your containerized applications with enterprise-grade security and compliance.",
    cta1: "View dashboard →",
    cta2: "Learn More →",
    image: "/images/Accelerate.webp", // You can replace this with a specific Manage image
  },
  {
    id: "secure",
    label: "Secure",
    title: "Secure your applications.",
    description:
      "Advanced security scanning and vulnerability management with real-time threat detection and automated remediation.",
    cta1: "Security features →",
    cta2: "Learn More →",
    image: "/images/Accelerate.webp", // You can replace this with a specific Secure image
  },
];

const TabIcon = ({ active }: { active: boolean }) => (
 <svg
   className={`w-6 h-6 transition-colors ${active ? "text-[#3A4EAA]" : "text-[#C4C4C4]"}`}
   viewBox="0 0 25 25"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
   aria-hidden
 >
   <g clipPath="url(#a)">
     <path
       d="M24.929 1.06c.081 1.324.081 2.651 0 3.98.02.134.044.273.071.419v.21c.062 4.79-3.264 8.418-6.671 11.493-.256 1.67-.514 3.34-.773 5.014-.314 1.214-1.316 2.549-2.572 2.827H14c-.713-.354-1.61-1.15-2.099-1.781-.424-.547-.517-1.197.034-1.707.992-.918 1.848.142 2.521.835.229-.247.501-.4.579-.748.398-1.803.246-4.89 1.415-6.266 1.362-1.605 3.189-2.84 4.374-4.646 1.641-2.502 1.861-5.229 1.723-8.161-3.232-.184-6.186.154-8.82 2.135-1.575 1.184-2.803 2.954-4.278 4.114C8.264 9.708 5.033 9.595 3.467 10.003c-.377.098-.557.316-.813.585.675.691 1.69 1.376.876 2.409-.468.592-1.126.601-1.712.166C1.173 12.685.005 11.479 0 10.65-.006 9.682 1.56 8.11 2.426 7.778c1.552-.598 3.882-.465 5.534-.923C10.44 4.417 12.516 2.046 15.926.85 18.182.059 21.466-.132 23.846.08c.594.053 1.032.374 1.083.98Z"
       fill="currentColor"
     />
     <path d="M24.999 5.038c-.02.061-.043.06-.07 0-.015-1.271.105-2.74 0-3.978h.07v3.978Z" fill="currentColor" />
     <path d="M24.999 5.457c-.117-.075-.068-.286-.07-.418h.07v.418Z" fill="currentColor" />
     <path
       d="M14.477 6.03c.5-.04 1.089.355 1.228.835.316 1.088-.704 1.255-.657 2.114.086 1.584 2.556 1.347 2.37-.188-.06-.5-.436-.638-.598-1.014-.559-1.294 1-2.396 2.118-1.205 1.386 1.476 1.083 3.83-.423 5.093-2.73 2.288-6.744-.436-5.709-3.804.208-.676.889-1.77 1.669-1.834Z"
       fill="currentColor"
     />
   </g>
   <defs>
     <clipPath id="a">
       <rect width="25" height="25" fill="#fff" />
     </clipPath>
   </defs>
 </svg>
);

export default function FeatureSection() {
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const goToSlide = (index: number) => {
    setActive(index);
  };

  // Track if FeatureSection is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


 const SplitTitle = ({ title }: { title: string }) => {
   const [first, rest] = useMemo(() => {
     const parts = title.split(" ");
     return [parts[0], parts.slice(1).join(" ")];
   }, [title]);
   return (
     <h1 className="text-3xl sm:text-[40px] lg:text-[56px] font-extrabold leading-tight mb-6">
       <span className="text-[#4EF0D2]">{first} </span>
       <span className="text-[#2D3748]">{rest}</span>
     </h1>
   );
 };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white">
      {/* Header with Tabs */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-center gap-4 sm:gap-6 w-fit mx-auto">
            {TAB_DATA.map((t, i) => {
              const isActive = active === i;
              return (
                <button
                  key={t.id}
                  onClick={() => goToSlide(i)}
                  aria-current={isActive}
                  aria-controls={t.id}
                  className={`flex items-center gap-3 px-6 sm:px-8 py-5 rounded-lg border transition-all w-full sm:w-auto min-w-[175px] justify-center
                  ${isActive ? "border-[#4EF0D2] shadow-sm" : "border-[#C4C4C4] hover:border-gray-400"}`}
                >
                  <TabIcon active={isActive} />
                  <span className={`text-base ${isActive ? "text-[#5B5B5B]" : "text-[#C4C4C4]"}`}>{t.label}</span>
                </button>
              );
            })}
          </div>

          
        </div>
      </div>

      {/* Right vertical dot indicators (desktop) - only show when section is in view */}
      <div className={`hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 transition-opacity duration-300 ${
        isInView ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        <div className="flex flex-col gap-3 pr-16">
          {TAB_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to ${TAB_DATA[i].label}`}
              aria-current={active === i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${active === i ? "bg-[#3A4EAA] scale-110" : "bg-[#C4C4C4]"}`}
            />
          ))}
        </div>
      </div>

      {/* Carousel Content */}
      <main className="relative min-h-screen sm:pt-0">
        {TAB_DATA.map((t, i) => (
          <section
            id={t.id}
            key={t.id}
            className={`absolute inset-0 min-h-screen flex items-start transition-all duration-500 ease-in-out ${
              active === i 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-24 w-full">
              {/* Mobile Layout: Text → Image → Buttons */}
              <div className="flex flex-col lg:hidden gap-8">
                {/* Text */}
                <div className="text-center">
                  <SplitTitle title={t.title} />
                  <p className="text-[16px] sm:text-[24px] text-[#4A5568] leading-relaxed mb-8">{t.description}</p>
                </div>

                {/* Image */}
                <div className="relative flex justify-center">
                  <Image
                    src={t.image}
                    alt={`${t.label} illustration`}
                    width={164}
                    height={230}
                    className="rounded-xl select-none pointer-events-none"
                    priority={i === 0}
                  />
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 justify-center">
                  <button className="px-6 py-3 bg-gradient-fill-mobile md:bg-gradient-fill-desktop rounded-lg font-medium  transition-colors w-max-content mx-auto sm:w-full min-w-[188px]">
                    {t.cta1}
                  </button>
                  <button className="px-6 py-3 border border-[#3A4EAA] text-[#3A4EAA] rounded-lg font-medium hover:bg-[#3A4EAA] hover:text-white transition-colors w-max-content mx-auto sm:w-full min-w-[188px]">
                    {t.cta2}
                  </button>
                </div>
              </div>

              {/* Desktop Layout: Text + Image side by side */}
              <div className="hidden lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Text */}
                <div className="text-left">
                  <SplitTitle title={t.title} />
                  <p className="text-xl text-[#4A5568] leading-relaxed mb-8">{t.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-start">
                    <button className="px-6 py-3 bg-gradient-fill-mobile md:bg-gradient-fill-desktop rounded-lg font-medium transition-colors">
                      {t.cta1}
                    </button>
                    <button className="px-6 py-3 border border-[#3A4EAA] text-[#3A4EAA] rounded-lg font-medium hover:bg-[#3A4EAA] hover:text-white transition-colors">
                      {t.cta2}
                    </button>
                  </div>
                </div>

                {/* Image */}
                <div className="relative flex justify-center">
                  <Image
                    src={t.image}
                    alt={`${t.label} illustration`}
                    width={418}
                    height={584}
                    className="rounded-xl select-none pointer-events-none"
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
   </div>
 );
}