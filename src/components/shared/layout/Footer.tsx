import Image from 'next/image'
import Link from 'next/link'

export default function FooterSection() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const headerHeight = 80 // Approximate header height
      const targetPosition = contactSection.offsetTop - headerHeight
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-20">
        {/* Top Section - Logo and Social Media */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
          <div className="mb-6 sm:mb-0 w-[200px]">
            <Link href="/">
              <Image
                src="/images/FooterLogo.webp"
                alt="KoalaLab Logo"
                width={200}
                height={40}
                className="h-10 cursor-pointer"
              />
            </Link>
          </div>
          <div className="flex space-x-4">
            {/* LinkedIn */}
            <a  href="https://www.linkedin.com/company/koalalab-inc/" target="_blank" className="text-white hover:text-gray-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/@KoalaLab-inc" target="_blank" className="text-white hover:text-gray-300">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/containers" className="text-sm text-gray-300 hover:text-white">
                    Koala Image directory
                  </Link>
                </li>
                <li>
                  <Link href="/containers" className="text-sm text-gray-300 hover:text-white">
                    Compare Koala Images
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/solutions/platform-devops" className="text-sm text-gray-300 hover:text-white">
                    For Platform/Devops teams
                  </a>
                </li>
                <li>
                  <a href="/solutions/cisos" className="text-sm text-gray-300 hover:text-white">
                    For CISOs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-gray-300 hover:text-white">
                    About KoalaLab
                  </Link>
                </li>
                <li>
                  <Link href="/about#team" className="text-sm text-gray-300 hover:text-white">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/about#advisors" className="text-sm text-gray-300 hover:text-white">
                    Advisors
                  </Link>
                </li>
              </ul>
            </div>

            {/* Blogs */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Blogs</h3>
            </div>

            {/* Book Your Call */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Book Your Call</h3>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="inline-block px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-gray-900 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex space-x-6">
            <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="/cookie-policy" className="text-sm text-gray-400 hover:text-white">
              Cookie policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
  