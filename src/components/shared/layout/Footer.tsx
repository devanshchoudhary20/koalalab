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

  // External arrow icon component
  const ExternalArrowIcon = () => (
    <span>↗</span>
  )

  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-20">
        {/* Top Section - Logo and Social Media */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16">
          <div className="mb-6 sm:mb-0 w-[200px]">
            <Link href="/">
              <Image
                src="/images/KoalaFooterLogo.webp"
                alt="KoalaLab Logo"
                width={158}
                height={42}
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

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[85%_15%] gap-8 mb-16">
          {/* Left Column - Multi-section grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:grid-cols-[35%_20%_20%_20%]">
            {/* Why KoalaLab? */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Why KoalaLab?</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/solutions/cisos/" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Ensure continuous compliance
                    <ExternalArrowIcon />
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/devops/" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Hardened containers with familiar experience
                    <ExternalArrowIcon />
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/devops/" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Build secure software
                    <ExternalArrowIcon />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Solution</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/solutions/cisos" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Security leaders
                    <ExternalArrowIcon />
                  </Link>
                </li>
                <li>
                  <Link href="/solutions/devops" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Platform Engineering
                    <ExternalArrowIcon />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Documentation */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Documentation</h3>
              <ul className="space-y-3">
                <li>
                  <Link target="_blank" rel="noreferrer nofollow" href="https://docs.koalalab.com" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Docs
                    <ExternalArrowIcon />
                  </Link>
                </li>
                <li>
                  <Link target="_blank" rel="noreferrer nofollow" href="https://github.com/koalalab-inc" className="text-sm text-gray-300 hover:text-white flex items-center">
                    Github
                    <ExternalArrowIcon />
                  </Link>
                </li>
              </ul>
            </div>

           
          </div>

          {/* Right Column - Standalone sections */}
          <div className="space-y-8">
            {/* About Us */}
            <div>
              <Link href="/about" className="text-lg font-semibold text-white mb-4">About Us</Link>
            </div>

            {/* Blogs */}
            { 
              false && 
              <div>
                <Link href="/" className="text-lg font-semibold text-white mb-4">Blogs</Link>
              </div>
            }

            {/* Contact Us */}
            <div>
              <a 
                href="#contact" 
                onClick={scrollToContact}
                className="text-lg font-semibold text-white mb-4"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-start gap-8 items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 KoalaLab
            </div>
            <div className="flex space-x-6">
              <Link target="_blank" rel="noreferrer nofollow" 
                href="https://docs.koalalab.com/legal/privacy-policy" 
                className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </Link>
              <Link target="_blank" rel="noreferrer nofollow" 
                href="https://docs.koalalab.com/legal/cookie-policy" 
                className="text-sm text-gray-400 hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
  