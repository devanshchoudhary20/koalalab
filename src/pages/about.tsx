import AboutPage from '@/components/pages/about/AboutPage'
import SEO from '@/components/shared/SEO'
import { getPageMetadata } from '@/config/metadata'

export default function About() {
	return (
		<>
			<SEO metadata={getPageMetadata('about')} />
			<AboutPage />
		</>
	)
}
