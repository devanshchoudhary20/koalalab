import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAdvisories } from '@/hooks/useAdvisories'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown } from 'lucide-react'
import AdvisoryTable from './AdvisoryTable'
import Pagination from '@/components/shared/Pagination'

interface AdvisoriesTabProps {
	containerSlug: string
}

const statuses = [
	{ value: 'all', label: 'All Statuses' },
	{ value: 'Under Investigation', label: 'Under Investigation' },
	{ value: 'Pending Upstream Fix', label: 'Pending Upstream Fix' },
	{ value: 'Fixed', label: 'Fixed' },
	{ value: 'Not Affected', label: 'Not Affected' },
	{ value: 'Fix Not Planned', label: 'Fix Not Planned' },
]

export default function AdvisoriesTab({ containerSlug }: AdvisoriesTabProps) {
	const router = useRouter()
	
	// Initialize state from URL parameters
	const [search, setSearch] = useState('')
	const [status, setStatus] = useState('all')
	const [page, setPage] = useState(1)

	// Update state from URL on mount and when URL changes
	useEffect(() => {
		const { adv_search, adv_status, adv_page } = router.query
		
		if (adv_search && typeof adv_search === 'string') {
			setSearch(adv_search)
		}
		if (adv_status && typeof adv_status === 'string') {
			setStatus(adv_status)
		}
		if (adv_page && typeof adv_page === 'string') {
			const pageNum = parseInt(adv_page, 10)
			if (!isNaN(pageNum) && pageNum > 0) {
				setPage(pageNum)
			}
		}
	}, [router.query])

	const { data, loading, error } = useAdvisories(containerSlug, {
		search: search || undefined,
		status: status !== 'all' ? status : undefined,
		page,
	})

	// Helper function to update URL parameters
	const updateUrlParams = (updates: Record<string, string | number | null>) => {
		const newQuery = { ...router.query }
		
		Object.entries(updates).forEach(([key, value]) => {
			if (value === null || value === '' || value === 'all' || value === 1) {
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
		setPage(1)
		updateUrlParams({
			adv_search: value,
			adv_page: 1
		})
	}

	const handleStatusChange = (newStatus: string) => {
		setStatus(newStatus)
		setPage(1)
		updateUrlParams({
			adv_status: newStatus,
			adv_page: 1
		})
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
		updateUrlParams({
			adv_page: newPage
		})
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-destructive mb-2 font-content">Error</h2>
				<p className="text-muted-foreground font-content">{error}</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Filters */}
			<div className="flex flex-col lg:flex-row gap-3">
				{/* Search Input - Left */}
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Search by Package or CVE"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10 font-content"
						/>
					</div>
				</div>

				{/* Status Dropdown - Right */}
				<div className="flex-1 lg:flex-initial lg:w-auto">
					<div className="relative">
						<select
							value={status}
							onChange={(e) => handleStatusChange(e.target.value)}
							className="w-full lg:w-auto px-3 py-2 pr-20 border border-input rounded-md bg-background text-sm font-content appearance-none cursor-pointer"
							style={{ color: 'transparent' }}
						>
							{statuses.map((status) => (
								<option key={status.value} value={status.value} className='text-black'>
									{status.label}
								</option>
							))}
						</select>
						<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-content pointer-events-none">Status: {status === 'all' ? 'All' : statuses.find(s => s.value === status)?.label || status}</span>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
					</div>
				</div>
			</div>

			{/* Advisories Table */}
			{loading ? (
				<div className="space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
					))}
				</div>
			) : data ? (
				<>
					<AdvisoryTable advisories={data.results} />
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
