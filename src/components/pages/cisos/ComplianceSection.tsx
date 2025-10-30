import Link from 'next/link'
import { CTAButtons } from '@/components/shared/common'

export default function ComplianceSection() {
	return (
		<section className="bg-white section-padding">
			<div className="section-container">
				{/* Main Heading */}
				<div className="mb-12">
					<h2 className="text-heading-large text-gray-800">
						Less CVEs.{' '}
						<span className="text-gradient-fill-desktop">Continuous compliance</span>
					</h2>
				</div>

				{/* Two Column Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-12 text-center max-w-5xl mx-auto">
					{/* Left Column */}
					<div className="space-y-6 pl-0 sm:pl-8 text-center sm:text-center">
						<p className="text-body-large text-gray-800">
							Global compliance frameworks are tightening vulnerability management norms.
						</p>
						
						<div className="space-y-4">
							<Link 
								href="https://www.fedramp.gov/resources/documents/CSP_Vulnerability_Scanning_Requirements.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="block link-external"
							>
								FedRAMP&apos;s vulnerability scanning (v3, Feb 2024) ↗
							</Link>
							<Link 
								href="https://www.commerce.uwo.ca/pdf/PCI-DSS-v4_0.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="block link-external"
							>
								PCI DSS v4.0 ↗
							</Link>
							<Link 
								href="https://finitestate.io/blog/iot-cra-compliance-vulnerability-response"
								target="_blank"
								rel="noopener noreferrer"
								className="block link-external"
							>
								Cyber Resilience Act (CRA) ↗
							</Link>
						</div>
					</div>

					{/* Right Column */}
					<div className="pr-0 sm:pr-8 text-center sm:text-center">
						<p className="text-body-large text-gray-800">
							With over 90% of your application code being open-source,{' '}
							<span className="text-primary-text_blue font-medium">CVE sprawl is real reality</span>{' '}
							& managing the ever-increasing software stack makes it even tougher.
						</p>
					</div>
				</div>

				{/* Call-to-Action Buttons */}
				<CTAButtons />
			</div>
		</section>
	)
}
