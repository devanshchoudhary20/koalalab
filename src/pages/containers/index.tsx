import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useContainers } from '@/hooks/useContainers'
import { Header, Footer } from '@/components/shared/layout'
import ContainerGrid from '@/components/pages/containers/ContainerGrid'
import SearchBar from '@/components/pages/containers/SearchBar'
import CategoryFilter from '@/components/pages/containers/CategoryFilter'
import Pagination from '@/components/shared/Pagination'
import { Container } from '@/types/api'

const categories = [
	{ id: 'all', label: 'All' },
	{ id: 'base', label: 'Base' },
	{ id: 'fips', label: 'FIPS' },
]

function sortContainersByRelevance(containers: Container[], searchTerm: string): Container[] {
	if (!searchTerm.trim()) return containers
	
	const lowerSearch = searchTerm.toLowerCase()
	
	return [...containers].sort((a, b) => {
		const aNameLower = a.name.toLowerCase()
		const bNameLower = b.name.toLowerCase()
		const aDescLower = a.description.toLowerCase()
		const bDescLower = b.description.toLowerCase()
		
		// Exact name match
		if (aNameLower === lowerSearch && bNameLower !== lowerSearch) return -1
		if (bNameLower === lowerSearch && aNameLower !== lowerSearch) return 1
		
		// Name starts with search term
		if (aNameLower.startsWith(lowerSearch) && !bNameLower.startsWith(lowerSearch)) return -1
		if (bNameLower.startsWith(lowerSearch) && !aNameLower.startsWith(lowerSearch)) return 1
		
		// Name contains search term
		if (aNameLower.includes(lowerSearch) && !bNameLower.includes(lowerSearch)) return -1
		if (bNameLower.includes(lowerSearch) && !aNameLower.includes(lowerSearch)) return 1
		
		// Description contains search term
		if (aDescLower.includes(lowerSearch) && !bDescLower.includes(lowerSearch)) return -1
		if (bDescLower.includes(lowerSearch) && !aDescLower.includes(lowerSearch)) return 1
		
		return 0
	})
}

export default function ContainersPage() {
	const router = useRouter()
	const [search, setSearch] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')
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
		page,
		per_page: 9,
	}), [search, page])

	const { data, loading, error } = useContainers(containerParams)
	
	// Filter containers by FIPS availability if needed
	const filteredContainers = useMemo(() => {
		if (!data?.results) return []
		
		let filtered = data.results
		
		// Apply client-side filtering for Base/FIPS
		if (selectedCategory === 'base') {
			filtered = filtered.filter(container => !container.fips_available)
		} else if (selectedCategory === 'fips') {
			filtered = filtered.filter(container => container.fips_available)
		}
		
		// Sort by relevance if search is active
		if (search.trim()) {
			filtered = sortContainersByRelevance(filtered, search)
		}
		
		return filtered
	}, [data?.results, selectedCategory, search])

	const updateURL = (updates: Record<string, string | number | undefined>) => {
		const newQuery = { ...router.query }
		
		Object.entries(updates).forEach(([key, value]) => {
			if (value === undefined || value === '' || value === 'all') {
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
			<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-5xl mx-auto">
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
						{Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className="aspect-[5/4] bg-white border border-gray-200 animate-pulse rounded-lg" />
						))}
					</div>
				) : data ? (
					<>
						{filteredContainers.length > 0 ? (
							<ContainerGrid containers={filteredContainers} />
						) : (
							<div className="text-center py-12">
								<p className="text-muted-foreground">No containers found matching your criteria.</p>
							</div>
						)}
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
