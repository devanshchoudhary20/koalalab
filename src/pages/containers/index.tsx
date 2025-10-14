import { useState } from 'react'
import { useContainers } from '@/hooks/useContainers'
import { Header, Footer } from '@/components/shared/layout'
import ContainerGrid from '@/components/pages/containers/ContainerGrid'
import SearchBar from '@/components/pages/containers/SearchBar'
import CategoryFilter from '@/components/pages/containers/CategoryFilter'
import Pagination from '@/components/shared/Pagination'

const categories = [
	{ id: 'featured', label: 'Python' },
	{ id: 'starter', label: 'Keyword2' },
	{ id: 'ai', label: 'Keyword3' },
	{ id: 'application', label: 'Application' },
	{ id: 'base', label: 'Base' },
	{ id: 'fips', label: 'FIPS' },
]

export default function ContainersPage() {
	const [search, setSearch] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('featured')
	const [page, setPage] = useState(1)

	const { data, loading, error } = useContainers({
		search: search || undefined,
		tags: selectedCategory !== 'featured' ? selectedCategory : undefined,
		page,
	})

	const handleSearch = (value: string) => {
		setSearch(value)
		setPage(1)
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
		setPage(1)
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
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

	return (
		<>
			<Header />
			<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
				<div className="space-y-6">
				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold">Search. Pull. Build.</h1>
					<p className="text-xl text-muted-foreground">
						Build, ship, and run secure software with minimal, hardened container images
					</p>
				</div>

				{/* Search and Filters */}
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="flex-1">
						<SearchBar onSearch={handleSearch} />
					</div>
					<div className="lg:w-auto">
						<CategoryFilter
							categories={categories}
							selectedCategory={selectedCategory}
							onCategoryChange={handleCategoryChange}
						/>
					</div>
				</div>

				

				{/* Container Grid */}
				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{Array.from({ length: 8 }).map((_, i) => (
							<div key={i} className="h-48 bg-white border border-gray-200 animate-pulse rounded-lg" />
						))}
					</div>
				) : data ? (
					<>
						<ContainerGrid containers={data.results} />
						{/* Debug info - remove in production */}
						<div className="text-sm text-gray-500 mb-4">
							Debug: Page {data.pagination.page} of {data.pagination.total_pages} 
							({data.pagination.total_results} total results, {data.results.length} on this page)
						</div>
						{data.pagination.total_pages > 1 && (
							<Pagination
								currentPage={data.pagination.page}
								totalPages={data.pagination.total_pages}
								onPageChange={handlePageChange}
								totalResults={data.pagination.total_results}
							/>
						)}
					</>
				) : null}
				</div>
			</main>
			<Footer />
		</>
	)
}
