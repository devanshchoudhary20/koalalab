import Image from "next/image";

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Abhishek Anand",
      role: "Co-Founder and CTO",
      image: "/images/male.webp"
    },
    {
      id: 2,
      name: "Abhimanyu Dhamija",
      role: "Co-founder and CEO",
      image: "/images/male.webp"
    }
  ]

  return (
    <section className="py-20 bg-primary-background_green">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-6xl font-bold text-center mb-16 font-heading">
          Know the <span className="text-primary-text_blue">Team</span>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center">
              {/* Team Member Image */}
              <div className="relative w-64 h-64 mb-6">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              {/* Team Member Info */}
              <h3 className="text-2xl font-bold text-primary-text_blue mb-2">
                {member.name}
              </h3>
              <p className="text-lg text-primary-text_gray">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
