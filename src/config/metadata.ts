const BASE_URL = 'https://koalalab.com'

export interface PageMetadata {
	title: string
	description: string
	canonicalUrl: string
	ogImage: string
	ogType: string
	twitterCard: string
}

export const metadata: Record<string, PageMetadata> = {
	home: {
		title: 'KoalaLab | Hardened base container images with a distro-like experience',
		description: 'Koala\'s Hardened "out-of-the-box" distroless container enable continuous compliance & unlock revenue. Built on 0-deb, container-first linux distro, koala\'s images provide familiar user-experience for developers.',
		canonicalUrl: `${BASE_URL}/`,
		ogImage: `${BASE_URL}/images/koalaLogoSquare.png`,
		ogType: 'website',
		twitterCard: 'summary_large_image',
	},
	about: {
		title: 'About KoalaLab | Tech leaders building the new frontier in container and code security',
		description: 'Meet KoalaLab\'s founding team & industry advisors. Learn about their inspiration for modern container design to enable enterprise security',
		canonicalUrl: `${BASE_URL}/about/`,
		ogImage: `${BASE_URL}/images/koalaLogoSquare.png`,
		ogType: 'website',
		twitterCard: 'summary_large_image',
	},
	containers: {
		title: 'Koala Container Registry | Browse hardened base container images',
		description: 'Explore KoalaLab\'s secure container image library with detailed SBOMs, usage guidelines, provenance and security advisory. Find the right hardened container for your enterprise applications.',
		canonicalUrl: `${BASE_URL}/containers/`,
		ogImage: `${BASE_URL}/images/koalaLogoSquare.png`,
		ogType: 'website',
		twitterCard: 'summary_large_image',
	},
	devops: {
		title: 'How Koala Creates Secure Images | Modernising linux for container security',
		description: 'Discover 0-deb, Koala\'s zero-bloat container-first debian-like distro is used for creation of drop-in replacement hardened containers. Enabling platform engineering teams to have a seamless experience.',
		canonicalUrl: `${BASE_URL}/solutions/devops/`,
		ogImage: `${BASE_URL}/images/koalaLogoSquare.png`,
		ogType: 'website',
		twitterCard: 'summary_large_image',
	},
	cisos: {
		title: 'Koala Images| Continuous compliance, application security & happy developers',
		description: 'Koala\'s hardened base container images solve the biggest challenge for security leaders: continuous compliance is a era of increasing tech stacks. With a familiar devex, koala images allow for seamless integration into enterprises\' infrastructure',
		canonicalUrl: `${BASE_URL}/solutions/cisos/`,
		ogImage: `${BASE_URL}/images/heroGraph.png`,
		ogType: 'website',
		twitterCard: 'summary_large_image',
	},
}

export function getPageMetadata(pageKey: keyof typeof metadata): PageMetadata {
	return metadata[pageKey]
}

