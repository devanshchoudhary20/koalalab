import { CTAButtons } from '@/components/shared/common'

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
					<p className="text-body-large text-primary-text_blue text-center max-w-3xl mx-auto">
						Ready to onboard your enteprise onto koala&apos;s hardened container images. Ready to onboard your enteprise onto koala&apos;s hardened container imagesReady to onboard your enteprise onto koala&apos;s hardened container images
					</p>
				</div>

				{/* Call-to-Action Buttons */}
				<CTAButtons />
			</div>
		</section>
	)
}
