import Image from 'next/image'

interface FeatureCardProps {
	icon: string
	title: string
	bullets: string[]
}

function FeatureCard({ icon, title, bullets }: FeatureCardProps) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 flex gap-4">
			<div className="flex-shrink-0">
				<Image
					src={icon}
					alt={title}
					width={48}
					height={48}
					className="w-12 h-12 object-contain"
				/>
			</div>
			<div className="flex-1">
				<h3 className="font-bold text-lg text-gray-800 mb-3">{title}</h3>
				<ul className="space-y-2">
					{bullets.map((bullet, index) => (
						<li key={index} className="text-sm text-gray-700 flex items-start">
							<span className="text-gray-400 mr-2">•</span>
							<span>{bullet}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default function HardenedAdvantageSection() {
	const features = [
		{
			icon: '/images/Cisos_footprint.webp',
			title: 'Minimal Footprint',
			bullets: [
				'No package manager footprint in container image',
				'No shell eliminates entire classes of attacks'
			]
		},
		{
			icon: '/images/cisos_sbom.webp',
			title: 'Build-time SBOM',
			bullets: [
				'Precise, build-time SBOMs generated during image build',
				'Accurate dependency tracking thanks to Koala\'s tight control over container SBOMs'
			]
		},
		{
			icon: '/images/cisos_userPremission.webp',
			title: 'User & Permissions',
			bullets: [
				'Non-root user by default',
				'Root login disabled in production images'
			]
		},
		{
			icon: '/images/cisos_vulnerability.webp',
			title: 'Vulnerability Management',
			bullets: [
				'Daily image scanning to identify vulnerabilities',
				'Daily image builds to keep dependencies up to date'
			]
		},
		{
			icon: '/images/cisos_resproduce.webp',
			title: 'Reproducibility & Trust',
			bullets: [
				'Image Signing & Verification',
				'Provenance attestation for full supply chain transparency',
				'Images signed with Cosign, verifiable against KoalaLab\'s GitHub identity'
			]
		},
		{
			icon: '/images/cisos_customize.webp',
			title: 'Bespoke usecases/Customize your image',
			bullets: [
				'Koala\'s tight control over the SBOM of the containers & custom minimal package registry allows us to provide customized images for any bespoke usecases.'
			]
		},
		{
			icon: '/images/cisos_multiStage.webp',
			title: 'Multi-stage Builds',
			bullets: [
				'Separate builder and production base images using multi-stage builds to produce minimal images'
			]
		}
	]

	return (
		<section className="bg-primary-background_green py-16 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header Section */}
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-heading">
						The hardened{' '}
						<span className="text-primary-text_blue">"out-of-the-box" advantage</span>{' '}
						
					</h2>
					<p className="text-lg text-primary-text_blue max-w-4xl mx-auto leading-relaxed">
						KoalaLab focusses on security of the whole software supply chain that builds the secure containers. Also, adds more hardening layers on top of base container images to make KoalaLab your extended{' '}
						<span className="font-semibold">golden container images team</span>.
					</p>
				</div>

				{/* Feature Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
					{features.map((feature, index) => (
						<FeatureCard
							key={index}
							icon={feature.icon}
							title={feature.title}
							bullets={feature.bullets}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
