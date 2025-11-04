import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useVulnerabilities } from '@/hooks/useVulnerabilities'
import { useContainerTags } from '@/hooks/useContainers'
import { Input } from '@/components/ui/input'
import { Search, ChevronDown, Tag } from 'lucide-react'
import VulnerabilityTable from './VulnerabilityTable'
import Pagination from '@/components/shared/Pagination'

interface VulnerabilitiesTabProps {
	containerSlug: string
}

const severities = [
	{ value: 'all', label: 'All' },
	{ value: 'Critical', label: 'Critical' },
	{ value: 'High', label: 'High' },
	{ value: 'Medium', label: 'Medium' },
	{ value: 'Low', label: 'Low' },
	{ value: 'Unspecified', label: 'Unspecified' },
]

export default function VulnerabilitiesTab({ containerSlug }: VulnerabilitiesTabProps) {
	const router = useRouter()
	const [selectedTag, setSelectedTag] = useState('latest')
	
	// Initialize state from URL parameters
	const [severity, setSeverity] = useState('all')
	const [arch, setArch] = useState('x86_64')
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	// Fetch available tags
	const { data: tagsData } = useContainerTags(containerSlug, {})

	// Update state from URL on mount and when URL changes
	useEffect(() => {
		const { vuln_severity, vuln_arch, vuln_search, vuln_page, vuln_tag } = router.query
		
		if (vuln_tag && typeof vuln_tag === 'string') {
			setSelectedTag(vuln_tag)
		}
		if (vuln_severity && typeof vuln_severity === 'string') {
			setSeverity(vuln_severity)
		}
		if (vuln_arch && typeof vuln_arch === 'string') {
			setArch(vuln_arch)
		}
		if (vuln_search && typeof vuln_search === 'string') {
			setSearch(vuln_search)
		}
		if (vuln_page && typeof vuln_page === 'string') {
			const pageNum = parseInt(vuln_page, 10)
			if (!isNaN(pageNum) && pageNum > 0) {
				setPage(pageNum)
			}
		}
	}, [router.query])

	const { data, loading, error } = useVulnerabilities(containerSlug, selectedTag, {
		arch: arch !== 'x86_64' ? arch : undefined,
		severity: severity !== 'all' ? severity : undefined,
		search: search || undefined,
		page,
	})

	// Helper function to update URL parameters
	const updateUrlParams = (updates: Record<string, string | number | null>) => {
		const newQuery = { ...router.query }
		
		Object.entries(updates).forEach(([key, value]) => {
			if (value === null || value === '' || value === 'all' || value === 'x86_64' || value === 1) {
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
			vuln_search: value,
			vuln_page: 1
		})
	}

	const handleSeverityChange = (newSeverity: string) => {
		setSeverity(newSeverity)
		setPage(1)
		updateUrlParams({
			vuln_severity: newSeverity,
			vuln_page: 1
		})
	}

	const handleTagChange = (newTag: string) => {
		setSelectedTag(newTag)
		setPage(1)
		updateUrlParams({
			vuln_tag: newTag,
			vuln_page: 1
		})
	}


	const handlePageChange = (newPage: number) => {
		setPage(newPage)
		updateUrlParams({
			vuln_page: newPage
		})
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
			<div className="flex flex-col lg:flex-row gap-3">
				{/* Tag Dropdown - Left */}
				<div className="flex-1 lg:flex-initial lg:w-auto">
					<div className="relative">
						<Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-600 pointer-events-none z-10" />
						<select
							value={selectedTag}
							onChange={(e) => handleTagChange(e.target.value)}
							className="w-full lg:w-auto px-3 py-2 pl-10 pr-10 border border-input rounded-md bg-background text-sm font-content appearance-none cursor-pointer"
							style={{ color: 'transparent' }}
						>
							{tagsData?.results.map((tag) => (
								<option key={tag.tag_name} value={tag.tag_name} className='text-black'>
									{tag.tag_name}
								</option>
							)) || (
								<option value="latest">latest</option>
							)}
						</select>
						<span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-sm font-content pointer-events-none">Tag: {selectedTag}</span>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
					</div>
				</div>

				{/* Search Input - Middle */}
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Filter vulnerabilities"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10 font-content"
						/>
					</div>
				</div>

				{/* Severity Dropdown - Right */}
				<div className="flex-1 lg:flex-initial lg:w-auto">
					<div className="relative">
						<select
							value={severity}
							onChange={(e) => handleSeverityChange(e.target.value)}
							className="w-full lg:w-auto px-3 py-2 pr-20 border border-input rounded-md bg-background text-sm font-content appearance-none cursor-pointer"
							style={{ color: 'transparent' }}
						>
							{severities.map((sev) => (
								<option key={sev.value} value={sev.value} className='text-black'>
									{sev.label}
								</option>
							))}
						</select>
						<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-content pointer-events-none">Severity: {severity === 'all' ? 'All' : severity}</span>
						<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
					</div>
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
