import Hero from '@/components/shared/Hero'

export default function DevOpsHero() {
	return (
		<Hero
			title="For platform engineering teams"
			description="Koala Base Container Images. Drop-in replacement with a familiar Debian-like toolchain. Built with precise SBOM control for security and transparency."
			showButton={true}
			buttonText="Try Koala images →"
			buttonHref="/try-koala"
		/>
	)
}
