import { Header, Footer } from '@/components/shared/layout'
import { ContactForm, ExplainerSection } from '@/components/shared/common'
import CisosHero from '@/components/pages/cisos/CisosHero'
import ComplianceSection from '@/components/pages/cisos/ComplianceSection'
import ExplainerSection2 from '@/components/pages/cisos/ExplainerSection2'
import HardenedAdvantageSection from '@/components/pages/cisos/HardenedAdvantageSection'
import FamiliarDevExSection from '@/components/pages/cisos/FamiliarDevExSection'

export default function CisosPage() {
	return (
		<>
			<Header />
			<CisosHero />
			<ComplianceSection />
			<ExplainerSection maxFeatures={3} />
			<ExplainerSection2 />
			<HardenedAdvantageSection />
			<FamiliarDevExSection />
			<ContactForm />
			<Footer />
		</>
	)
}
