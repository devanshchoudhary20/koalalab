
export default function CustomizeImageSection() {
	return (
		<section className="bg-white section-padding">
			<div className="section-container">
				{/* Main Heading */}
				<div className="mb-12">
					<h2 className="text-heading-large text-gray-800">
						Customize your image.{' '}
						<span className="text-gradient-fill-desktop">Your way</span>
					</h2>
				</div>

				{/* Two Column Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-12 text-left max-w-35xl mx-auto">
					{/* Left Column */}
					<div className="space-y-6 pl-0 sm:pl-8 text-center sm:text-center">
						<p className="text-body-large text-gray-800">
							The combination of C(APT)ain & minimal package universe allows for a very precise control over the SBOM of the containers; enabling security and allowing for custom use-cases when required.
						</p>
					</div>

					{/* Right Column */}
					<div className="pr-0 sm:pr-8 text-center sm:text-center">
						<p className="text-body-large text-gray-800">
							Koala&apos;s enterprise plans offer C(CAPT)ain and our minimal package universe along with the Hardened &quot;out-of-the-box&quot; base container images. This combination helps with any enteprise-centric custom use-case your teams might have.
						</p>
					</div>
				</div>

			</div>
		</section>
	)
}
