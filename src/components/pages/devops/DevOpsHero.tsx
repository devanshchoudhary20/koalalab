import Hero from '@/components/shared/Hero'

export default function DevOpsHero() {
	return (
		<Hero
			title="For platform engineering teams"
			subtitle="Koala Base Container Images"
			description="Drop-in replacement with a familiar Debian-like toolchain. Built with precise SBOM control for security and transparency."
			showButton={true}
			buttonText="Try Koala images →"
			buttonHref="/containers"
		/>
	)
}
