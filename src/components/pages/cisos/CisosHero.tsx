import Hero from '@/components/shared/Hero'

export default function CisosHero() {
	return (
		<Hero
			title="For CISOs"
			description="Continuous compliance, productivity for your teams & container images that engineers will love."
			showButton={true}
			buttonText="Try Koala images →"
			buttonHref="/containers"
		/>
	)
}
