import Link from 'next/link'

export default function EnterpriseOnboardingSection() {
	return (
		<section className="bg-white section-padding">
			<div className="section-container">
				{/* Main Heading */}
				<div className="mb-12">
					<h2 className="text-heading-large text-gray-800 text-center">
						Need a good headline here
					</h2>
				</div>

				{/* Body Text */}
				<div className="mb-12">
					<p className="text-body-large text-primary-text_blue text-center max-w-4xl mx-auto">
						Ready to onboard your enteprise onto koala&apos;s hardened container images. Ready to onboard your enteprise onto koala&apos;s hardened container imagesReady to onboard your enteprise onto koala&apos;s hardened container images
					</p>
				</div>

				{/* Call-to-Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Link
						href="/contact"
						className="button-primary"
					>
						Talk to us →
					</Link>
					<Link
						href="/images"
						className="button-secondary"
					>
						Explore images →
					</Link>
				</div>
			</div>
		</section>
	)
}
