import Head from 'next/head'
import { PageMetadata } from '@/config/metadata'

interface SEOProps {
	metadata: PageMetadata
}

export default function SEO({ metadata }: SEOProps) {
	return (
		<Head>
			<title>{metadata.title}</title>
			<meta name="description" content={metadata.description} />
			<link rel="canonical" href={metadata.canonicalUrl} />

			{/* Open Graph / Facebook */}
			<meta property="og:type" content={metadata.ogType} />
			<meta property="og:url" content={metadata.canonicalUrl} />
			<meta property="og:title" content={metadata.title} />
			<meta property="og:description" content={metadata.description} />
			<meta property="og:image" content={metadata.ogImage} />

			{/* Twitter */}
			<meta property="twitter:card" content={metadata.twitterCard} />
			<meta property="twitter:url" content={metadata.canonicalUrl} />
			<meta property="twitter:title" content={metadata.title} />
			<meta property="twitter:description" content={metadata.description} />
			<meta property="twitter:image" content={metadata.ogImage} />
		</Head>
	)
}

