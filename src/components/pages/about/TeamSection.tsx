import Image from "next/image";

export default function TeamSection() {
  const teamMembers = [
    {
      id: 1,
      name: "Abhishek Anand",
      role: "Co-Founder and CTO",
      image: "/images/AbhishekAnand.avif"
    },
    {
      id: 2,
      name: "Abhimanyu Dhamija",
      role: "Co-founder and CEO",
      image: "/images/Abhimanyu.avif"
    }
  ]

  return (
    <section className="section-padding bg-primary-background_green">
      <div className="section-container">
        <h2 className="text-heading-large text-center mb-16">
          Know the <span className="text-primary-text_blue">Team</span>
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center">
              {/* Team Member Image */}
              <div className="relative w-[18rem] h-[18rem] mb-6">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              
              {/* Team Member Info */}
              <h3 className="text-heading-medium text-bold text-primary-text_blue mb-2">
                {member.name}
              </h3>
              <p className="text-body-medium text-primary-text_blue">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
