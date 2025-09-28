import Image from "next/image";

export default function AdvisorsSection() {
  const advisors = [
    {
      id: 1,
      name: "Abhimanyu Dhamija",
      role: "Co-founder and CEO",
      image: "/images/male.webp"
    },
    {
      id: 2,
      name: "Abhimanyu Dhamija",
      role: "Co-founder and CEO",
      image: "/images/male.webp"
    },
    {
      id: 3,
      name: "Abhimanyu Dhamija",
      role: "Co-founder and CEO",
      image: "/images/male.webp"
    },
    {
      id: 4,
      name: "Abhimanyu Dhamija",
      role: "Co-founder and CEO",
      image: "/images/male.webp"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-6xl font-bold text-center mb-16 font-heading">
          Our <span className="text-gradient-fill-mobile sm:text-gradient-desktop">Advisors</span>
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
              <h3 className="text-2xl font-bold text-primary-text_blue mb-2">
                {advisor.name}
              </h3>
              <p className="text-lg text-blue-gray-600">
                {advisor.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
