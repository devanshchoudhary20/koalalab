import { Header, Footer } from '@/components/shared/layout'
import DevOpsHero from '@/components/pages/devops/DevOpsHero'
import MinimalContainerDilemma from '@/components/pages/devops/MinimalContainerDilemma'
import ContainerBloatProblem from '@/components/pages/devops/ContainerBloatProblem'
import ContainerFirstTimeline from '@/components/pages/devops/ContainerFirstTimeline'
import HowItWorksImage from '@/components/shared/HowItWorksImage'
import CustomizeImageSection from '@/components/pages/devops/CustomizeImageSection'
import VideoCarousel from '@/components/shared/common/Video/VideoCarousel'
import EnterpriseOnboardingSection from '@/components/pages/devops/EnterpriseOnboardingSection'
import { ContactForm } from '@/components/shared/common'
import SEO from '@/components/shared/SEO'
import { getPageMetadata } from '@/config/metadata'

export default function DevOpsPage() {
	return (
		<>
			<SEO metadata={getPageMetadata('devops')} />
			<Header />
			<DevOpsHero />
			<MinimalContainerDilemma />
			<ContainerBloatProblem />
			<ContainerFirstTimeline />
			<HowItWorksImage />
		    <CustomizeImageSection />
			<VideoCarousel />
			<EnterpriseOnboardingSection />
			<ContactForm />
			<Footer />
		</>
	)
}
