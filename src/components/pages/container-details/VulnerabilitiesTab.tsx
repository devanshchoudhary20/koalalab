import { useState } from 'react'
import { useVulnerabilities } from '@/hooks/useVulnerabilities'
import { Input } from '@/components/ui/input'
import { Search, Filter } from 'lucide-react'
import VulnerabilityTable from './VulnerabilityTable'
import Pagination from '@/components/shared/Pagination'

interface VulnerabilitiesTabProps {
	containerSlug: string
}

const severities = [
	{ value: 'all', label: 'All Severities' },
	{ value: 'Critical', label: 'Critical' },
	{ value: 'High', label: 'High' },
	{ value: 'Medium', label: 'Medium' },
	{ value: 'Low', label: 'Low' },
	{ value: 'Unspecified', label: 'Unspecified' },
]

const architectures = [
	{ value: 'x86_64', label: 'x86_64' },
	{ value: 'arm64', label: 'arm64' },
]

export default function VulnerabilitiesTab({ containerSlug }: VulnerabilitiesTabProps) {
	const [selectedTag] = useState('latest')
	const [severity, setSeverity] = useState('all')
	const [arch, setArch] = useState('x86_64')
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	const { data, loading, error } = useVulnerabilities(containerSlug, selectedTag, {
		arch: arch !== 'x86_64' ? arch : undefined,
		severity: severity !== 'all' ? severity : undefined,
		search: search || undefined,
		page,
	})

	const handleSearch = (value: string) => {
		setSearch(value)
		setPage(1)
	}

	const handleSeverityChange = (newSeverity: string) => {
		setSeverity(newSeverity)
		setPage(1)
	}

	const handleArchChange = (newArch: string) => {
		setArch(newArch)
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
						<div className="text-2xl font-bold text-severity-critical">{data.tag_metadata?.vulnerabilities?.critical || 0}</div>
						<div className="text-sm text-muted-foreground">Critical</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-high">{data.tag_metadata?.vulnerabilities?.high || 0}</div>
						<div className="text-sm text-muted-foreground">High</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-medium">{data.tag_metadata?.vulnerabilities?.medium || 0}</div>
						<div className="text-sm text-muted-foreground">Medium</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-low">{data.tag_metadata?.vulnerabilities?.low || 0}</div>
						<div className="text-sm text-muted-foreground">Low</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-severity-negligible">{data.tag_metadata?.vulnerabilities?.negligible || 0}</div>
						<div className="text-sm text-muted-foreground">Negligible</div>
					</div>
				</div>
			)}

			{/* Filters */}
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Search vulnerabilities by CVE ID, package, or version"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
					<select
						value={severity}
						onChange={(e) => handleSeverityChange(e.target.value)}
						className="px-3 py-2 border border-input rounded-md bg-background text-sm"
					>
						{severities.map((sev) => (
							<option key={sev.value} value={sev.value}>
								{sev.label}
							</option>
						))}
					</select>
					<select
						value={arch}
						onChange={(e) => handleArchChange(e.target.value)}
						className="px-3 py-2 border border-input rounded-md bg-background text-sm"
					>
						{architectures.map((arch) => (
							<option key={arch.value} value={arch.value}>
								{arch.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Vulnerabilities Table */}
			{loading ? (
				<div className="space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
					))}
				</div>
			) : data ? (
				<>
					<VulnerabilityTable vulnerabilities={data.results} />
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
