import { Header, Footer } from '@/components/shared/layout'
import { ContactForm, ExplainerSection } from '@/components/shared/common'
import { 
	CisosHero, 
	ComplianceSection,
	ExplainerSection2,
} from './index'

export default function CisosPage() {
	return (
		<div>
			<Header />
			<CisosHero />
			<ComplianceSection />
			<ExplainerSection maxFeatures={3} />
			<ExplainerSection2 />
			<ContactForm />
			<Footer />
		</div>
	)
}
