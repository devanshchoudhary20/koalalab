import { useState } from 'react'
import { usePackages } from '@/hooks/usePackages'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, Download } from 'lucide-react'
import PackageTable from './PackageTable'
import Pagination from '@/components/shared/Pagination'

interface SBOMTabProps {
	containerSlug: string
}

const architectures = [
	{ value: 'x86_64', label: 'x86_64' },
	{ value: 'arm64', label: 'arm64' },
]

export default function SBOMTab({ containerSlug }: SBOMTabProps) {
	const [selectedTag] = useState('latest')
	const [arch, setArch] = useState('x86_64')
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	const { data, loading, error } = usePackages(containerSlug, selectedTag, {
		arch: arch !== 'x86_64' ? arch : undefined,
		search: search || undefined,
		page,
	})

	const handleSearch = (value: string) => {
		setSearch(value)
		setPage(1)
	}

	const handleArchChange = (newArch: string) => {
		setArch(newArch)
		setPage(1)
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
	}

	const handleDownloadSBOM = () => {
		// In a real implementation, this would download the SBOM file
		alert('SBOM download would be implemented here')
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-muted/50 rounded-lg">
					<div className="text-center">
						<div className="text-2xl font-bold text-primary">{data.pagination.total_results}</div>
						<div className="text-sm text-muted-foreground">Total Packages</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-primary">
							{new Set(data.results.map(pkg => pkg.repository)).size}
						</div>
						<div className="text-sm text-muted-foreground">Repositories</div>
					</div>
					<div className="text-center">
						<div className="text-2xl font-bold text-primary">
							{new Set(data.results.map(pkg => pkg.license)).size}
						</div>
						<div className="text-sm text-muted-foreground">Licenses</div>
					</div>
				</div>
			)}

			{/* Filters and Actions */}
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="flex-1">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Search packages by name, version, or license"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Filter className="h-4 w-4 text-muted-foreground" />
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
					<Button onClick={handleDownloadSBOM} className="bg-primary text-primary-foreground">
						<Download className="h-4 w-4 mr-2" />
						Download SBOM
					</Button>
				</div>
			</div>

			{/* Packages Table */}
			{loading ? (
				<div className="space-y-4">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
					))}
				</div>
			) : data ? (
				<>
					<PackageTable packages={data.results} />
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
