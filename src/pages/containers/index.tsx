import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
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
	const router = useRouter()
	const [search, setSearch] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('featured')
	const [page, setPage] = useState(1)
	

	// Initialize state from URL parameters on mount
	useEffect(() => {
		if (router.isReady) {
			const { search: searchParam, category, page: pageParam } = router.query
			
			if (searchParam && typeof searchParam === 'string') {
				setSearch(searchParam)
			}
			if (category && typeof category === 'string') {
				setSelectedCategory(category)
			}
			if (pageParam && typeof pageParam === 'string') {
				const pageNum = parseInt(pageParam, 10)
				if (!isNaN(pageNum) && pageNum > 0) {
					setPage(pageNum)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.isReady])

	const containerParams = useMemo(() => ({
		search: search || undefined,
		tags: selectedCategory !== 'featured' ? selectedCategory : undefined,
		page,
	}), [search, selectedCategory, page])

	const { data, loading, error } = useContainers(containerParams)

	const updateURL = (updates: Record<string, string | number | undefined>) => {
		const newQuery = { ...router.query }
		
		Object.entries(updates).forEach(([key, value]) => {
			if (value === undefined || value === '' || value === 'featured') {
				delete newQuery[key]
			} else {
				newQuery[key] = String(value)
			}
		})

		router.push({
			pathname: router.pathname,
			query: newQuery
		}, undefined, { shallow: true })
	}

	const handleSearch = (value: string) => {
		setSearch(value)
		// Only reset page and update URL if search value is not empty
		if (value.trim() !== '') {
			setPage(1)
			updateURL({ search: value, page: 1 })
		} else {
			// If search is empty, just update the search param without resetting page
			updateURL({ search: value })
		}
	}

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category)
		setPage(1)
		updateURL({ category, page: 1 })
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
		updateURL({ page: newPage })
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
						{data.pagination.total_pages > 1 && (
							<Pagination
								currentPage={page}
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
