import { useState } from 'react'
import { useContainerTags } from '@/hooks/useContainers'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter } from 'lucide-react'
import TagTable from './TagTable'
import Pagination from '@/components/shared/Pagination'

interface TagsTabProps {
	containerSlug: string
}

const variants = [
	{ value: 'all', label: 'All' },
	{ value: 'builder', label: 'Builder' },
	{ value: 'production', label: 'Production' },
]

export default function TagsTab({ containerSlug }: TagsTabProps) {
	const [variant, setVariant] = useState('all')
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	const { data, loading, error } = useContainerTags(containerSlug, {
		variant: variant !== 'all' ? variant : undefined,
		search: search || undefined,
		page,
	})

	const handleSearch = (value: string) => {
		setSearch(value)
		setPage(1)
	}

	const handleVariantChange = (newVariant: string) => {
		setVariant(newVariant)
		setPage(1)
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
				<p className="text-muted-foreground">{error}</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Filters */}
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Filter tags"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<select
						value={variant}
						onChange={(e) => handleVariantChange(e.target.value)}
						className="px-3 py-2 border border-input rounded-md bg-background text-sm"
					>
						{variants.map((variant) => (
							<option key={variant.value} value={variant.value}>
								Variant: {variant.label}
							</option>
						))}
					</select>
					<Button variant="outline" size="sm">
						Customize image
					</Button>
				</div>
			</div>

			{/* Tags Table */}
			{loading ? (
				<div className="space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
					))}
				</div>
			) : data ? (
				<>
					<TagTable tags={data.results} containerSlug={containerSlug} />
					{data.pagination.total_pages > 1 && (
						<Pagination
							currentPage={data.pagination.page}
							totalPages={data.pagination.total_pages}
							onPageChange={handlePageChange}
						/>
					)}
				</>
			) : null}
		</div>
	)
}
