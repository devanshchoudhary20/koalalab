import Image from 'next/image'

const features = [
  {
    title: '90% open source code',
    description: 'From Python to NGINX, Postgres, Java, Node & more',
    icon: '/images/openSourceCode.webp'
  },
  {
    title: '42+ code hours saved',
    description: 'Reduce costly engineering toil on vulnerability management',
    icon: '/images/HoursSaved.webp'
  },
  {
    title: '400+ FIP images hardened',
    description: 'Build on Hardened Open-Source Components',
    icon: '/images/ImageHardened.webp'
  },
  {
    title: '97.6% CVE Reduced',
    description: 'Rely on trusted open source to improve your security posture',
    icon: '/images/CVE_Reduced.webp'
  }
]

const ExplainerSection = () => {
  return (
    <section className="relative py-24 px-6 md:px-8">
      {/* Background Image */}
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
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
            Secure Your Software & Unlock Your Productivity
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-white">
            Build your code on secure components and run hardened containers across your entire cloud-native stack.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{ width: '265px', height: '262px', margin: 'auto' }}
            >
              <div className="mb-4 h-16 w-16 relative">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExplainerSection