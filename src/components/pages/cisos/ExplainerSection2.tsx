import Image from 'next/image'
import Link from 'next/link'

export default function ExplainerSection2() {
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
		<div className="bg-white relative">
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-green-50/30"></div>
			<div className="relative isolate pt-0 overflow-hidden">
				<div className="mx-auto max-w-fit px-6 py-16 sm:py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-24">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto text-center lg:text-left">
						<p className="mt-10 p-4 text-pretty text-4xl font-content font-light tracking-tight text-gray-900 md:text-5xl sm:text-6xl sm:leading-[1.3] leading-[1.2]">
							Koala&apos;s enterprise plans offer competitive SLAs for all vulnerability management which means you will always have a version of each base container which is 0-CVE or vulnerability-free.
						</p>
						<div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-6">
							<Link
								href="#contact"
								onClick={scrollToContact}
								className="rounded-md bg-gradient-fill-desktop px-8 py-2.5 text-sm"
							>
								Talk to us <span aria-hidden="true">→</span>
							</Link>
							<Link href="/containers" className="text-sm/6 text-gradient-fill-blueText border border-gradient-fill-blueText px-2.5 py-1.5 rounded-md">
								Explore images <span aria-hidden="true">→</span>
							</Link>
						</div>
					</div>
					<div className="mt-16 sm:mt-24 lg:mt-0 lg:grow relative">
						{/* Background circles - Left side */}
						<div className="absolute -left-[50px] -bottom-[100px] w-[200px] h-auto xl:-left-[100px]">
							<Image src="/images/heroBackCircle.webp" alt="Background circle" width={96} height={96} 
								className='w-full h-full object-contain'/>
						</div>

						{/* Background circles - Right side */}
						<div className="absolute -right-[150px] -top-[150px] w-[350px] sm:w-[350px] w-[250px] -top-[200px] sm:-top-[150px] h-auto xl:-right-[200px]">
							<Image src="/images/heroBackCircle.webp" alt="Background circle" width={96} height={96}   
								className='w-full h-full object-contain'/>
						</div>
						{/* Background circles - Bottom right side */}
						<div className="absolute -right-[80px] w-[150px] md:w-[300px] -bottom-[50px] md:-bottom-[300px] h-auto xl:-right-[130px] hidden sm:block">
							<Image src="/images/heroBackCircle.webp" alt="Background circle" width={88} height={88} 
								className='w-full h-full object-contain'/>
						</div>

						{/* Main hero graph image */}
						<div className="relative z-10">							
							{/* Desktop image */}
							<Image 
								src="/images/CisosExplainerGraph.webp" 
								alt="Hero" 
								width={500} 
								height={500} 
								className='w-full h-full object-cover'
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
