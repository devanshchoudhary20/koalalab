import { useState } from 'react'
import { usePackages } from '@/hooks/usePackages'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Download } from 'lucide-react'
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
			{/* Filters and Actions - rebuilt to match screenshots */}
			<div className="grid grid-cols-1 md:grid-cols-12 gap-3">
				{/* Left: Tag and Architecture */}
				<div className="md:col-span-4 flex gap-3">
					<div className="flex-1">
						<select
							value={selectedTag}
							className="w-full h-10 border border-input rounded-md bg-background text-sm px-3 font-content"
						>
							<option>Tags: Latest</option>
						</select>
					</div>
					<div className="flex-1">
						<select
							value={arch}
							onChange={(e) => handleArchChange(e.target.value)}
							className="w-full h-10 border border-input rounded-md bg-background text-sm px-3 font-content"
						>
							{architectures.map((arch) => (
								<option key={arch.value} value={arch.value}>
									Architecture: {arch.label}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Middle: Search */}
				<div className="md:col-span-5">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
						<Input
							placeholder="Search"
							value={search}
							onChange={(e) => handleSearch(e.target.value)}
							className="pl-10 h-10 font-content"
						/>
					</div>
				</div>

				{/* Right: Download button */}
				<div className="md:col-span-3 flex md:justify-end hidden md:flex r">
					<Button
						onClick={handleDownloadSBOM}
						className="h-10 bg-transparent text-foreground border border-[#1CE8AB] hover:bg-[#E0FFF6] font-content rounded-full"
					>
						<Download className="h-4 w-4 mr-2 text-[#1CE8AB] " />
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
