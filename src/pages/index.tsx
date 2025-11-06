import HomePage from '@/components/pages/home/HomePage'
import SEO from '@/components/shared/SEO'
import { getPageMetadata } from '@/config/metadata'

export default function Home() {
	return (
		<>
			<SEO metadata={getPageMetadata('home')} />
			<HomePage />
		</>
	)
}
