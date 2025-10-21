import Image from "next/image";

export default function AdvisorsSection() {
  const advisors = [
    {
      id: 1,
      name: "Ashish Bhadouria",
      role: "Security, Engineering Manager  IKEA",
      image: "/images/Ashish.avif"
    },
    {
      id: 2,
      name: "Adam Frankl",
      role: "Ex-CMO at Jfrog, Neo4j",
      image: "/images/Adam.avif"
    },
    {
      id: 3,
      name: "Helen Altshuler",
      role: "Ex-Google Cloud, CEO at Engflow",
      image: "/images/Helen.avif"
    },
    {
      id: 4,
      name: "Shiv Chandra Kumar",
      role: "Engineering at Google Cloud",
      image: "/images/ShivChandra.avif"
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <h2 className="text-heading-large text-center mb-16">
          Our <span className="text-gradient-fill-mobile sm:text-gradient-desktop">Advisors</span> and Investors
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-6xl mx-auto">
          {advisors.map((advisor) => (
            <div key={advisor.id} className="flex flex-col items-center text-center">
              {/* Advisor Image */}
              <div className="relative w-48 h-48 mb-6">
                <Image 
                  src={advisor.image} 
                  alt={advisor.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              {/* Advisor Info */}
              <h3 className="text-heading-medium text-primary-text_blue mb-2">
                {advisor.name}
              </h3>
              <p className="text-body-medium text-blue-gray-600">
                {advisor.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
