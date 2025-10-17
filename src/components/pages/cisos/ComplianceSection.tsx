import Link from 'next/link'

export default function ComplianceSection() {
	return (
		<section className="bg-white py-16 px-4 ">
			<div className="max-w-6xl mx-auto text-center">
				{/* Main Heading */}
				<div className="mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-800 font-heading">
						Less CVEs.{' '}
						<span className="text-gradient-fill-desktop">Continuous compliance</span>
					</h2>
				</div>

				{/* Two Column Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 font-content text-left">
					{/* Left Column */}
					<div className="space-y-6 pl-0 sm:pl-8 font-content  text-pretty  font-light tracking-tight sm:leading-[1.3] leading-[1.2] text-center sm:text-left">
						<p className="text-2xl text-gray-800 leading-relaxed ">
							Global compliance frameworks are tightening vulnerability management norms.
						</p>
						
						<div className="space-y-4 font-content text-pretty text-xl  font-light tracking-tight sm:leading-[1.3] leading-[1.2]">
							<Link 
								href="https://www.fedramp.gov/resources/documents/CSP_Vulnerability_Scanning_Requirements.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-gray-800 hover:text-gray-600 underline decoration-1 underline-offset-2 transition-colors"
							>
								FedRAMP&apos;s vulnerability scanning (v3, Feb 2024) ↗
							</Link>
							<Link 
								href="https://www.commerce.uwo.ca/pdf/PCI-DSS-v4_0.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-gray-800 hover:text-gray-600 underline decoration-1 underline-offset-2 transition-colors"
							>
								PCI DSS v4.0 ↗
							</Link>
							<Link 
								href="https://finitestate.io/blog/iot-cra-compliance-vulnerability-response"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-gray-800 hover:text-gray-600 underline decoration-1 underline-offset-2 transition-colors"
							>
								Cyber Resilience Act (CRA) ↗
							</Link>
						</div>
					</div>

					{/* Right Column */}
					<div className="pr-0 sm:pr-8 font-content text-pretty  font-light tracking-tight sm:leading-[1.3] leading-[1.2]">
						<p className="text-2xl text-gray-800 leading-relaxed text-pretty text-center sm:text-left">
							With over 90% of your application code being open-source,{' '}
							<span className="text-primary-text_blue font-bold">CVE sprawl is real reality</span>{' '}
							& managing the ever-increasing software stack makes it even tougher.
						</p>
					</div>
				</div>

				{/* Call-to-Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link
						href="/contact"
						className="bg-gradient-fill-desktop hover:bg-opacity-90 text-primary-text_blue font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2"
					>
						Talk to us →
					</Link>
					<Link
						href="/containers"
						className="bg-white border border-primary-text_blue text-primary-text_blue hover:bg-gray-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2"
					>
						Explore images →
					</Link>
				</div>
			</div>
		</section>
	)
}
