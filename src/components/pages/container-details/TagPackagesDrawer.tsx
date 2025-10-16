import React, { useState, useEffect } from 'react'
import { usePackages } from '@/hooks/usePackages'
import { useVulnerabilities } from '@/hooks/useVulnerabilities'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
	X, 
	Search, 
	Download, 
	Copy, 
	Package,
	ChevronDown,
	Plus,
	AlertTriangle
} from 'lucide-react'
import { Tag } from '@/types/api'
import { formatRelativeTime, formatSize } from '@/lib/utils/formatters'

interface TagPackagesDrawerProps {
	containerSlug: string
	tag: Tag
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
	const [selectedVuln, setSelectedVuln] = useState<string | null>(null)
	const [isAnimating, setIsAnimating] = useState(false)
	const [severityFilter, setSeverityFilter] = useState('all')

	const { data: packagesData, loading: packagesLoading, error: packagesError } = usePackages(containerSlug, tag.tag_name, {
		arch: selectedArch !== 'x86_64' ? selectedArch : undefined,
		search: search || undefined,
		page: 1,
	})

	const { data: vulnerabilitiesData, loading: vulnerabilitiesLoading, error: vulnerabilitiesError } = useVulnerabilities(containerSlug, tag.tag_name, {
		arch: selectedArch !== 'x86_64' ? selectedArch : undefined,
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

	// Filter vulnerabilities by severity
	const filteredVulnerabilities = vulnerabilitiesData?.results.filter(vuln => {
		if (severityFilter === 'all') return true
		return vuln.severity.toLowerCase() === severityFilter
	}) || []

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
					className={`fixed right-0 top-0 h-full w-full md:w-[40%] md:max-w-2xl bg-background shadow-xl transform transition-transform duration-300 ease-in-out rounded-none md:rounded-l-lg overflow-hidden flex flex-col ${isAnimating ? 'translate-x-0' : 'translate-x-full'}`}
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
					<div className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
							<Package className="h-6 w-6 text-muted-foreground" />
						</div>
						<div>
							<h2 className="text-xl sm:text-2xl font-bold">{containerSlug}</h2>
							<p className="text-sm text-muted-foreground">
								Last changed {formatRelativeTime(tag.last_changed)}
							</p>
						</div>
					</div>
					<Button variant="ghost" size="sm" onClick={onClose} className="ml-4">
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Docker Pull Command */}
				<div className="px-4 sm:px-6 py-4 bg-muted/50">
					<div className="flex items-center space-x-2">
						<code className="flex-1 bg-background border border-input px-3 py-2 rounded text-sm font-mono">
							docker pull kla.dev/KoalaLab/{containerSlug}:{tag.tag_name}
						</code>
						<Button
							variant="outline"
							size="sm"
							onClick={() => copyToClipboard(`docker pull kla.dev/KoalaLab/${containerSlug}:${tag.tag_name}`)}
						>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Tag Dropdown */}
				<div className="px-4 sm:px-6 py-3 border-b">
					<div className="flex items-center space-x-2">
						<span className="text-sm font-medium">Tag:</span>
						<div className="relative">
							<Button variant="outline" size="sm" className="h-8 px-3">
								{tag.tag_name}
								<ChevronDown className="h-4 w-4 ml-1" />
							</Button>
						</div>
					</div>
				</div>

				{/* Architecture Selection */}
				<div className="px-4 sm:px-6 py-4 border-b">
					<h3 className="text-sm font-medium mb-3">Architecture</h3>
					<div className="flex flex-wrap gap-2">
						{tag.size.architectures.map((arch, index) => (
							<Button
								key={index}
								variant={selectedArch === arch ? 'default' : 'outline'}
								size="sm"
								onClick={() => setSelectedArch(arch)}
								className="text-sm"
							>
								{arch}: {formatSize(tag.size.total_mb)}
							</Button>
						))}
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="px-4 sm:px-6 py-4 border-b">
					<div className="flex items-center space-x-4 sm:space-x-6">
						<Button 
							variant={activeTab === 'packages' ? 'default' : 'ghost'}
							onClick={() => setActiveTab('packages')}
							className={activeTab === 'packages' ? 'bg-blue-600 hover:bg-blue-700' : ''}
						>
							<Package className="h-4 w-4 mr-2" />
							Packages
						</Button>
						<Button 
							variant={activeTab === 'vulnerabilities' ? 'default' : 'ghost'}
							onClick={() => setActiveTab('vulnerabilities')}
							className={activeTab === 'vulnerabilities' ? 'bg-blue-600 hover:bg-blue-700' : ''}
						>
							<AlertTriangle className="h-4 w-4 mr-2" />
							Vulnerabilities
						</Button>
					</div>
				</div>

				{/* Content */}
				<div className="flex-1 overflow-hidden flex flex-col min-h-0">
					{/* Search and Download */}
					<div className="px-4 sm:px-6 py-4 border-b flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
						<div className="flex-1 relative w-full">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
							<Input
								placeholder={activeTab === 'packages' ? 'Filter Packages' : 'Filter Vulnerabilities'}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-10"
							/>
						</div>
						{activeTab === 'vulnerabilities' && (
							<div className="flex items-center space-x-2">
								<span className="text-sm font-medium">Severity:</span>
								<Button 
									variant="outline" 
									size="sm" 
									className="h-8 px-3"
									onClick={() => setSeverityFilter(severityFilter === 'all' ? 'critical' : 'all')}
								>
									{severityFilter === 'all' ? 'All' : severityFilter.charAt(0).toUpperCase() + severityFilter.slice(1)}
									<ChevronDown className="h-4 w-4 ml-1" />
								</Button>
							</div>
						)}
						{activeTab === 'packages' && (
							<Button onClick={handleDownloadSBOM} className="bg-teal-600 hover:bg-teal-700 text-white">
								<Download className="h-4 w-4 mr-2" />
								Download SBOM
							</Button>
						)}
					</div>

					

					{/* Content Table */}
					<div className="flex-1 overflow-auto min-h-0" onScroll={handleScroll}>
						{activeTab === 'packages' ? (
							packagesLoading ? (
								<div className="p-4 sm:p-6 text-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
									<p className="mt-2 text-muted-foreground">Loading packages...</p>
								</div>
							) : packagesError ? (
								<div className="p-4 sm:p-6 text-center">
									<p className="text-destructive">Error loading packages: {packagesError}</p>
								</div>
							) : packagesData ? (
								<div className="overflow-x-auto h-full">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Package</TableHead>
												<TableHead>Version</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{packagesData.results.map((pkg, index) => (
												<TableRow key={index}>
													<TableCell>
														<div className="font-medium">{pkg.package}</div>
													</TableCell>
													<TableCell>
														<div className="font-mono text-sm">{pkg.version}</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							) : null
						) : (
							vulnerabilitiesLoading ? (
								<div className="p-4 sm:p-6 text-center">
									<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
									<p className="mt-2 text-muted-foreground">Loading vulnerabilities...</p>
								</div>
							) : vulnerabilitiesError ? (
								<div className="p-4 sm:p-6 text-center">
									<p className="text-destructive">Error loading vulnerabilities: {vulnerabilitiesError}</p>
								</div>
							) : vulnerabilitiesData ? (
								<div className="overflow-x-auto h-full">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>CVE ID</TableHead>
												<TableHead>Severity</TableHead>
												<TableHead>Last detected</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{filteredVulnerabilities.map((vuln) => (
												<React.Fragment key={vuln.cve_id}>
													<TableRow 
														className="cursor-pointer hover:bg-muted/50"
														onClick={() => setSelectedVuln(selectedVuln === vuln.cve_id ? null : vuln.cve_id)}
													>
														<TableCell>
															<div className="flex items-center space-x-2">
																{/* Icon changes based on expanded state */}
																{selectedVuln === vuln.cve_id ? (
																	<X className="h-4 w-4 text-gray-500" />
																) : (
																	<Plus className="h-4 w-4 text-green-600" />
																)}
																<div className="font-mono text-sm font-medium">{vuln.cve_id}</div>
															</div>
														</TableCell>
														<TableCell>
															<Badge 
																className={`rounded-md px-2 py-1 text-sm font-medium ${
																	vuln.severity === 'Critical' ? 'bg-severity-critical text-white' :
																	vuln.severity === 'High' ? 'bg-severity-high text-white' :
																	vuln.severity === 'Medium' ? 'bg-severity-medium text-white' :
																	vuln.severity === 'Low' ? 'bg-severity-low text-white' :
																	'bg-severity-negligible text-white'
																}`}
															>
																{vuln.severity === 'Critical' ? 'Critical: 8.5' :
																 vuln.severity === 'High' ? 'High: 5.9' :
																 vuln.severity === 'Medium' ? 'Medium: 3.8' :
																 vuln.severity === 'Low' ? 'Low: 2.1' :
																 'Negligible: 0.5'}
															</Badge>
														</TableCell>
														<TableCell>
															<div className="text-sm text-muted-foreground">
																Aug 27, 2025 03:23:47 AM GMT+0
															</div>
														</TableCell>
													</TableRow>
													{/* Expanded content row */}
													{selectedVuln === vuln.cve_id && (
														<TableRow>
															<TableCell colSpan={3} className="p-0">
																<div className="bg-muted/30 border-t">
																	<div className="p-4 sm:p-6">
																		{/* Description */}
																		<div className="mb-4">
																			<h3 className="font-semibold mb-2 text-sm">Description</h3>
																			<p className="text-sm text-muted-foreground leading-relaxed">
																				There is an issue in CPython when using &quot;bytes.decode(&quot;unicode_escape&quot;, error=&quot;ignore | replace&quot;). If you are not using the &quot;unicode_escape&quot; encoding or an error handler your usage is not affected. To work-around this issue you may stop using the error handler and instead wrap the bytes.decode() call in a try-except catching the DecodeError.
																			</p>
																		</div>
																		
																		{/* References */}
																		<div>
																			<h3 className="font-semibold mb-2 text-sm">References</h3>
																			<ul className="space-y-1">
																				<li>
																					<a 
																						href={`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${vuln.cve_id}`}
																						target="_blank"
																						rel="noopener noreferrer"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Getting Started with the Python KoalaLab Image
																					</a>
																				</li>
																				<li>
																					<a 
																						href={`https://nvd.nist.gov/vuln/detail/${vuln.cve_id}`}
																						target="_blank"
																						rel="noopener noreferrer"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Migrating to Python KoalaLab Images
																					</a>
																				</li>
																				<li>
																					<a 
																						href="#"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Updating a Python Microservice for KoalaLab Images
																					</a>
																				</li>
																				<li>
																					<a 
																						href="#"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Debugging Distroless Images
																					</a>
																				</li>
																				<li>
																					<a 
																						href="#"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Blog Post: Securely Containerize a Python Application with KoalaLab Images
																					</a>
																				</li>
																				<li>
																					<a 
																						href="#"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Video: How to containerize a Python application with a multi-stage build using KoalaLab Images
																					</a>
																				</li>
																				<li>
																					<a 
																						href="#"
																						className="text-blue-600 hover:underline text-sm block"
																					>
																						Learning Lab: Deploying a Flask App with Python and nginx KoalaLab Images
																					</a>
																				</li>
																			</ul>
																		</div>
																	</div>
																</div>
															</TableCell>
														</TableRow>
													)}
												</React.Fragment>
											))}
										</TableBody>
									</Table>
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
