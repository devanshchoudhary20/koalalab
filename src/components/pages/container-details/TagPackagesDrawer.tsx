import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePackages } from '@/hooks/usePackages'
import { useVulnerabilities } from '@/hooks/useVulnerabilities'
import { useContainer } from '@/hooks/useContainers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
	X, 
	Search, 
	Download, 
	Copy, 
	Package,
	ChevronDown,
	AlertTriangle,
	Tag
} from 'lucide-react'
import { Tag as TagType } from '@/types/api'
import { formatRelativeTime, formatSize } from '@/lib/utils/formatters'
import PackageTable from './PackageTable'
import VulnerabilityTable from './VulnerabilityTable'

interface TagPackagesDrawerProps {
	containerSlug: string
	tag: TagType
	isOpen: boolean
	onClose: () => void
}

export default function TagPackagesDrawer({ 
	containerSlug, 
	tag, 
	isOpen, 
	onClose 
}: TagPackagesDrawerProps) {
	const [activeTab, setActiveTab] = useState<'packages' | 'vulnerabilities'>('packages')
	const [search, setSearch] = useState('')
	const [selectedArch, setSelectedArch] = useState('x86_64')
	const [isAnimating, setIsAnimating] = useState(false)
	const [severityFilter, setSeverityFilter] = useState('all')

	const { data: containerData } = useContainer(containerSlug)

	const { data: packagesData, loading: packagesLoading, error: packagesError } = usePackages(containerSlug, tag.tag_name, {
		arch: selectedArch !== 'x86_64' ? selectedArch : undefined,
		search: search || undefined,
		page: 1,
	})

	const { data: vulnerabilitiesData, loading: vulnerabilitiesLoading, error: vulnerabilitiesError } = useVulnerabilities(containerSlug, tag.tag_name, {
		arch: selectedArch !== 'x86_64' ? selectedArch : undefined,
		severity: severityFilter !== 'all' ? severityFilter : undefined,
		search: search || undefined,
		page: 1,
	})

	// Animation effect and prevent all background interactions
	useEffect(() => {
		if (isOpen) {
			setIsAnimating(true)
			// Prevent body scroll and all interactions when drawer is open
			document.body.style.overflow = 'hidden'
			document.body.style.pointerEvents = 'none'
			
			// Add event listeners to prevent all interactions on background
			const preventInteraction = (e: Event) => {
				e.preventDefault()
				e.stopPropagation()
				return false
			}

			// Prevent all types of interactions on the document
			document.addEventListener('wheel', preventInteraction, { passive: false })
			document.addEventListener('touchmove', preventInteraction, { passive: false })
			document.addEventListener('scroll', preventInteraction, { passive: false })
			document.addEventListener('keydown', preventInteraction, { passive: false })
			document.addEventListener('click', preventInteraction, { passive: false })
			document.addEventListener('mousedown', preventInteraction, { passive: false })
			document.addEventListener('mouseup', preventInteraction, { passive: false })

			// Cleanup function
			return () => {
				document.removeEventListener('wheel', preventInteraction)
				document.removeEventListener('touchmove', preventInteraction)
				document.removeEventListener('scroll', preventInteraction)
				document.removeEventListener('keydown', preventInteraction)
				document.removeEventListener('click', preventInteraction)
				document.removeEventListener('mousedown', preventInteraction)
				document.removeEventListener('mouseup', preventInteraction)
				document.body.style.overflow = 'unset'
				document.body.style.pointerEvents = 'auto'
			}
		} else {
			// Restore body interactions when drawer is closed
			document.body.style.overflow = 'unset'
			document.body.style.pointerEvents = 'auto'
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset'
			document.body.style.pointerEvents = 'auto'
		}
	}, [isOpen])

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
	}

	const handleDownloadSBOM = () => {
		// In a real implementation, this would download the SBOM file
		alert('SBOM download would be implemented here')
	}

	const handleBackdropClick = () => {
		onClose()
	}

	const handleDrawerClick = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const handleScroll = (e: React.UIEvent) => {
		e.stopPropagation()
	}

	const handleSeverityChange = (newSeverity: string) => {
		setSeverityFilter(newSeverity)
	}

	const severities = [
		{ value: 'all', label: 'All' },
		{ value: 'Critical', label: 'Critical' },
		{ value: 'High', label: 'High' },
		{ value: 'Medium', label: 'Medium' },
		{ value: 'Low', label: 'Low' },
		{ value: 'Unspecified', label: 'Unspecified' },
	]

	if (!isOpen) return null

	return (
		<>
			{/* Backdrop overlay that blocks all interactions */}
			<div 
				className="fixed inset-0 bg-black/50 z-40" 
				onClick={handleBackdropClick}
				onWheel={(e) => e.stopPropagation()}
				onTouchMove={(e) => e.stopPropagation()}
				onScroll={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				onMouseDown={(e) => e.stopPropagation()}
				onMouseUp={(e) => e.stopPropagation()}
				style={{ pointerEvents: 'auto' }}
			/>
			{/* Drawer container */}
			<div className="fixed inset-0 z-50 pointer-events-none">
				<div 
					data-drawer
					className={`fixed right-0 top-0 h-full w-full md:w-[60%] md:max-w-2xl bg-background shadow-xl transform transition-transform duration-300 ease-in-out rounded-none md:rounded-l-lg overflow-hidden flex flex-col ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
					onClick={handleDrawerClick}
					onWheel={(e) => e.stopPropagation()}
					onTouchMove={(e) => e.stopPropagation()}
					onMouseDown={(e) => e.stopPropagation()}
					onMouseUp={(e) => e.stopPropagation()}
					onKeyDown={(e) => e.stopPropagation()}
					style={{ pointerEvents: 'auto' }}
				>
				{/* Header */}
				<div className="flex items-center justify-between p-4 sm:p-6 border-b">
					<div className="flex items-center space-x-3 sm:space-x-4">
						{containerData?.logo_url ? (
							<div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
								<Image
									src={containerData.logo_url}
									alt={containerData.name || containerSlug}
									width={64}
									height={64}
									className="object-contain"
								/>
							</div>
						) : (
							<div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
								<Package className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
							</div>
						)}
						<div className="flex-1 min-w-0">
							<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 break-words">
								{containerData?.name || containerSlug}
							</h2>
							<p className="text-sm sm:text-base text-[#14003D]/70">
								Last changed {formatRelativeTime(tag.last_changed)}
							</p>
						</div>
					</div>
					<Button variant="ghost" size="sm" onClick={onClose} className="ml-4">
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Docker Pull Command */}
				<div className="px-4 sm:px-6 py-4">
					<div className="flex items-center space-x-2">
						<code 
							className="flex-1 bg-background border border-[#1CE8AB] px-3 py-2 rounded text-sm font-mono"
							style={{ borderColor: '#1CE8AB' }}
						>
							docker pull kla.dev/KoalaLab/{containerSlug}:{tag.tag_name}
						</code>
						<Button
							variant="outline"
							size="sm"
							onClick={() => copyToClipboard(`docker pull kla.dev/KoalaLab/${containerSlug}:${tag.tag_name}`)}
							className="border-[#1CE8AB]"
							style={{ borderColor: '#1CE8AB' }}
						>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Architecture Selection */}
				<div className="px-4 sm:px-6 pb-4">
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium">Architecture</span>
						<div className="flex flex-wrap gap-2">
							{tag.size.architectures.map((arch, index) => (
								<Button
									key={index}
									variant="outline"
									size="sm"
									onClick={() => setSelectedArch(arch)}
									className={`text-sm rounded-full ${
										selectedArch === arch
											? 'bg-[#E0FFF6] border-[#1CE8AB] hover:bg-[#E0FFF6]'
											: 'bg-white border-[#1CE8AB]'
									}`}
									style={{
										backgroundColor: selectedArch === arch ? '#E0FFF6' : 'white',
										borderColor: '#1CE8AB'
									}}
								>
									{arch}: {formatSize(tag.size.total_mb)}
								</Button>
							))}
						</div>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="px-4 sm:px-6 border-b">
					<div className="flex items-center space-x-4 sm:space-x-6">
						<button
							onClick={() => setActiveTab('packages')}
							className={`flex items-center gap-2 bg-transparent border-0 rounded-none text-[#3548A2] transition-opacity whitespace-nowrap ${
								activeTab === 'packages'
									? 'opacity-100 border-b-2 border-[#3548A2] pb-2'
									: 'opacity-70 hover:opacity-100'
							}`}
							style={{
								borderBottom: activeTab === 'packages' ? '2px solid #3548A2' : 'none',
								paddingBottom: activeTab === 'packages' ? '0.5rem' : '0'
							}}
						>
							<Package className="h-4 w-4" color="currentColor" />
							<span>Packages</span>
						</button>
						<button
							onClick={() => setActiveTab('vulnerabilities')}
							className={`flex items-center gap-2 bg-transparent border-0 rounded-none text-[#3548A2] transition-opacity whitespace-nowrap ${
								activeTab === 'vulnerabilities'
									? 'opacity-100 border-b-2 border-[#3548A2] pb-2'
									: 'opacity-70 hover:opacity-100'
							}`}
							style={{
								borderBottom: activeTab === 'vulnerabilities' ? '2px solid #3548A2' : 'none',
								paddingBottom: activeTab === 'vulnerabilities' ? '0.5rem' : '0'
							}}
						>
							<AlertTriangle className="h-4 w-4" color="currentColor" />
							<span>Vulnerabilities</span>
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-hidden flex flex-col min-h-0 scrollbar-hide">
					{/* Filters and Actions */}
					<div className="px-4 sm:px-6 py-4 border-b">
						{activeTab === 'packages' ? (
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
								{/* Search */}
								<div className="flex-1 w-full">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
										<Input
											placeholder="Filter Packages"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
											className="pl-10 font-content"
										/>
									</div>
								</div>
								{/* Download SBOM */}
								<Button
									onClick={handleDownloadSBOM}
									className="bg-transparent text-foreground border border-[#1CE8AB] hover:bg-[#E0FFF6] font-content rounded-full"
								>
									<Download className="h-4 w-4 mr-2 text-[#1CE8AB]" />
									Download SBOM
								</Button>
							</div>
						) : (
							<div className="flex flex-col lg:flex-row gap-3">
								{/* Tag Dropdown - Left */}
								<div className="flex-1 lg:flex-initial lg:w-auto">
									<div className="relative">
										<Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-600 pointer-events-none z-10" />
										<select
											value={tag.tag_name}
											disabled
											className="w-full lg:w-auto px-3 py-2 pl-10 pr-10 border border-input rounded-md bg-background text-sm font-content appearance-none cursor-pointer"
											style={{ color: 'transparent' }}
										>
											<option value={tag.tag_name}>{tag.tag_name}</option>
										</select>
										<span className="absolute left-10 top-1/2 transform -translate-y-1/2 text-sm font-content pointer-events-none">Tag: {tag.tag_name}</span>
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
											onChange={(e) => setSearch(e.target.value)}
											className="pl-10 font-content"
										/>
									</div>
								</div>

								{/* Severity Dropdown - Right */}
								<div className="flex-1 lg:flex-initial lg:w-auto">
									<div className="relative">
										<select
											value={severityFilter}
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
										<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-content pointer-events-none">Severity: {severityFilter === 'all' ? 'All' : severityFilter}</span>
										<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Content Table */}
					<div className="flex-1 overflow-auto min-h-0" onScroll={handleScroll}>
						{activeTab === 'packages' ? (
							packagesLoading ? (
								<div className="space-y-4 p-4">
									{Array.from({ length: 5 }).map((_, i) => (
										<div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
									))}
								</div>
							) : packagesError ? (
								<div className="p-4 sm:p-6 text-center">
									<p className="text-destructive">Error loading packages: {packagesError}</p>
								</div>
							) : packagesData ? (
								<div className="p-4">
									<PackageTable packages={packagesData.results} />
								</div>
							) : null
						) : (
							vulnerabilitiesLoading ? (
								<div className="space-y-4 p-4">
									{Array.from({ length: 5 }).map((_, i) => (
										<div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
									))}
								</div>
							) : vulnerabilitiesError ? (
								<div className="p-4 sm:p-6 text-center">
									<p className="text-destructive">Error loading vulnerabilities: {vulnerabilitiesError}</p>
								</div>
							) : vulnerabilitiesData ? (
								<div className="p-4">
									<VulnerabilityTable vulnerabilities={vulnerabilitiesData.results} />
								</div>
							) : null
						)}
					</div>

				</div>
			</div>
			</div>
		</>
	)
}
