import { useRouter } from 'next/router'
import { useContainer } from '@/hooks/useContainers'
import { Header, Footer } from '@/components/shared/layout'
import ContainerHeader from '@/components/pages/container-details/ContainerHeader'
import TabNavigation from '@/components/pages/container-details/TabNavigation'

export default function ContainerDetailsPage() {
	const router = useRouter()
	const { slug, tab } = router.query

	const { data: container, loading, error } = useContainer(slug as string)

	if (loading) {
		return (
			<>
				<Header />
				<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
					<div className="space-y-6">
						<div className="h-32 bg-muted animate-pulse rounded-lg" />
						<div className="h-64 bg-muted animate-pulse rounded-lg" />
					</div>
				</main>
				<Footer />
			</>
		)
	}

	if (error) {
		return (
			<>
				<Header />
				<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
					<div className="text-center py-12">
						<h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
						<p className="text-muted-foreground">{error}</p>
					</div>
				</main>
				<Footer />
			</>
		)
	}

	if (!container) {
		return (
			<>
				<Header />
				<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
					<div className="text-center py-12">
						<h2 className="text-2xl font-bold mb-2">Container Not Found</h2>
						<p className="text-muted-foreground">
							The container you're looking for doesn't exist.
						</p>
					</div>
				</main>
				<Footer />
			</>
		)
	}

	return (
		<>
			<Header />
			<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
				<div className="space-y-6">
					<ContainerHeader container={container} />
					<TabNavigation 
						containerSlug={container.slug} 
						activeTab={tab as string || 'tags'}
						onTabChange={(newTab) => {
							router.push({
								pathname: router.pathname,
								query: { ...router.query, tab: newTab }
							}, undefined, { shallow: true })
						}}
					/>
				</div>
			</main>
			<Footer />
		</>
	)
}
