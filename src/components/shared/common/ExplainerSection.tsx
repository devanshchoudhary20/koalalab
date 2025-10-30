import Image from 'next/image'

const features = [
  {
    title: '88% less CVE accumulation',
    description: 'Ensure continuous compliance',
    icon: '/images/openSourceCode.webp'
  },
  {
    title: 'Remove 90% of your CVEs',
    description: 'Securely manage the tech sprawl',
    icon: '/images/CVE_Reduced.webp'
  },
  {
    title: '95% less High+Critical CVEs',
    description: 'Ensure no release blockers',
    icon: '/images/ImageHardened.webp'
  },
  {
    title: 'Faster builds, faster boot time',
    description: 'Containers your cloud team will love',
    icon: '/images/HoursSaved.webp'
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
            Secure Software. Unlock Revenue.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto text-white">
            Build your application on Koala&apos;s hardened base container images and give your developers a familiar linux experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-fit mx-auto">
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
