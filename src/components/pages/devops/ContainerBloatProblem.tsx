import Image from 'next/image'

export default function ContainerBloatProblem() {
	return (
		<section className="section-padding" style={{ background: 'linear-gradient(to bottom, #E0FFF6, #FFFFFF)' }}>
			<div className="section-container">
				{/* Main Title */}
				<div className="mb-8">
					<h2 className="text-heading-large text-gray-800">
						<span className="text-primary-text_gray">Understanding the</span>{' '}
						<span className="text-primary-text_blue">container bloat problem</span>
					</h2>
				</div>

				{/* Introductory Paragraph */}
				<div className="mb-12">
					<p className="text-body-large text-primary-text_blue max-w-3xl mx-auto">
						KoalaLab started with understanding where the container bloat stemmed from & those issue came from
					</p>
				</div>

				{/* Three Column Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
					{/* Card 1 */}
					<div className="card-base max-w-xs mx-auto text-center sm:text-left">
						<div className="flex items-start gap-4">
							<div className="number-badge">
								1
							</div>
							<div>
								<h4 className="text-heading-small text-gray-800 mb-2 text-primary-text_blue">
									Bloated Package Universe
								</h4>
								<p className="text-body-small text-gray-800">
									Debian&apos;s package creation includes unnecessary maintainer scripts
								</p>
							</div>
						</div>
					</div>

					{/* Card 2 */}
					<div className="card-base max-w-xs mx-auto text-center sm:text-left">
						<div className="flex items-start gap-4">
							<div className="number-badge">
								2
							</div>
							<div>
								<h4 className="text-heading-small text-gray-800 mb-2 text-primary-text_blue">
									Package Manager Footprint
								</h4>
								<p className="text-body-small text-gray-800">
									APT leaves behind significant overhead
								</p>
							</div>
						</div>
					</div>

					{/* Card 3 */}
					<div className="card-base max-w-xs mx-auto text-center sm:text-left">
						<div className="flex items-start gap-4">
							<div className="number-badge">
								3
							</div>
							<div>
								<h4 className="text-heading-small text-gray-800 mb-2 text-primary-text_blue">
									Non-Essential &quot;Essentials&quot;
								</h4>
								<p className="text-body-small text-gray-800">
									Many packages marked as essential aren&apos;t actually needed in containers
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Concluding Paragraph */}
				<div className="mb-12">
					<p className="text-body-large text-primary-text_blue max-w-3xl mx-auto">
						This bloat creates a larger attack surface with more CVEs, while consuming extra resources and slowing deployments.
					</p>
				</div>

				{/* Bloat Diagram Image */}
				<div className="flex justify-center">
					<Image
						src="/images/devops_bloat.webp"
						alt="Container Bloat Problem Diagram"
						width={800}
						height={600}
						className="max-w-full h-auto "
						priority
					/>
				</div>
			</div>
		</section>
	)
}
