import { useState } from 'react'
import { useAdvisories } from '@/hooks/useAdvisories'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
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
	const [search, setSearch] = useState('')
	const [status, setStatus] = useState('all')
	const [page, setPage] = useState(1)

	const { data, loading, error } = useAdvisories(containerSlug, {
		search: search || undefined,
		status: status !== 'all' ? status : undefined,
		page,
	})

	const handleSearch = (value: string) => {
		setSearch(value)
		setPage(1)
	}

	const handleStatusChange = (newStatus: string) => {
		setStatus(newStatus)
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
			{/* Header with Summary */}
			{data && (
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-6 bg-muted/50 rounded-lg">
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-high">
							{data.results.filter(adv => adv.status === 'Under Investigation').length}
						</div>
						<div className="text-sm text-muted-foreground">Under Investigation</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-medium">
							{data.results.filter(adv => adv.status === 'Pending Upstream Fix').length}
						</div>
						<div className="text-sm text-muted-foreground">Pending Fix</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-green-600">
							{data.results.filter(adv => adv.status === 'Fixed').length}
						</div>
						<div className="text-sm text-muted-foreground">Fixed</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-gray-600">
							{data.results.filter(adv => adv.status === 'Not Affected').length}
						</div>
						<div className="text-sm text-muted-foreground">Not Affected</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-critical">
							{data.results.filter(adv => adv.status === 'Fix Not Planned').length}
						</div>
						<div className="text-sm text-muted-foreground">Fix Not Planned</div>
					</div>
				</div>
			)}

			{/* Filters */}
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Search advisories by CVE ID or package"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<select
						value={status}
						onChange={(e) => handleStatusChange(e.target.value)}
						className="px-3 py-2 border border-input rounded-md bg-background text-sm"
					>
						{statuses.map((status) => (
							<option key={status.value} value={status.value}>
								{status.label}
							</option>
						))}
					</select>
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
