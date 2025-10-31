import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, X, ChevronUp } from 'lucide-react'
import { Advisory, AdvisoryDetails } from '@/types/api'
import { formatVulnerabilityDate, formatAdvisoryDateForTimeline, getStatusBgColor } from '@/lib/utils/formatters'
import { fetchAdvisoryDetails } from '@/lib/api/containers'

interface AdvisoryTableProps {
	advisories: Advisory[]
}

export default function AdvisoryTable({ advisories }: AdvisoryTableProps) {
	const [expandedCve, setExpandedCve] = useState<string | null>(null)
	const [advisoryDetails, setAdvisoryDetails] = useState<Record<string, AdvisoryDetails>>({})
	const [loadingDetails, setLoadingDetails] = useState<Record<string, boolean>>({})
	const [referencesExpanded, setReferencesExpanded] = useState<Record<string, boolean>>({})

	const handleRowClick = async (advisory: Advisory) => {
		const cveId = advisory.cve_id
		
		if (expandedCve === cveId) {
			setExpandedCve(null)
		} else {
			setExpandedCve(cveId)
			
			// Fetch details if not already loaded
			if (!advisoryDetails[cveId] && !loadingDetails[cveId]) {
				setLoadingDetails(prev => ({ ...prev, [cveId]: true }))
				try {
					const details = await fetchAdvisoryDetails(
						advisory.package_slug,
						advisory.cve_slug
					)
					setAdvisoryDetails(prev => ({ ...prev, [cveId]: details }))
				} catch (error) {
					console.error('Failed to fetch advisory details:', error)
				} finally {
					setLoadingDetails(prev => ({ ...prev, [cveId]: false }))
				}
			}
		}
	}

	const toggleReferences = (cveId: string) => {
		setReferencesExpanded(prev => ({
			...prev,
			[cveId]: !prev[cveId]
		}))
	}

	const getStatusBadgeStyle = (status: string) => {
		const bgColor = getStatusBgColor(status)
		
		if (status === 'Fixed') {
			return {
				backgroundColor: bgColor,
				color: '#000000',
				border: '1px solid #1CE8AB'
			}
		}
		
		if (status === 'Pending Upstream Fix') {
			return {
				backgroundColor: bgColor,
				color: '#000000',
				border: '1px solid #000000'
			}
		}
		
		if (status === 'Under Investigation') {
			return {
				backgroundColor: bgColor,
				color: '#000000'
			}
		}
		
		if (status === 'Not Affected') {
			return {
				backgroundColor: bgColor,
				color: '#000000'
			}
		}
		
		return {
			backgroundColor: bgColor,
			color: '#FFFFFF'
		}
	}

	return (
		<div className="bg-white">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-content border-b">Date detected</TableHead>
						<TableHead className="font-content border-b">CVE ID</TableHead>
						<TableHead className="font-content border-b">Package</TableHead>
						<TableHead className="font-content border-b">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{/* Spacer row after header */}
					<TableRow className="border-0 h-3">
						<TableCell colSpan={4} className="p-0 border-0" />
					</TableRow>
					{advisories.map((advisory, index) => {
						const isExpanded = expandedCve === advisory.cve_id
						const details = advisoryDetails[advisory.cve_id]
						const isLoading = loadingDetails[advisory.cve_id]
						const isReferencesExpanded = referencesExpanded[advisory.cve_id] ?? true
						const prevAdvisory = index > 0 ? advisories[index - 1] : null
						const prevExpanded = prevAdvisory ? expandedCve === prevAdvisory.cve_id : false
						const dateParts = formatAdvisoryDateForTimeline(advisory.date_detected).split('\n')
						
						return (
							<React.Fragment key={`${advisory.cve_id}-${index}`}>
								{/* Spacer row for gap between rows */}
								{index > 0 && !prevExpanded && (
									<TableRow className="border-0 h-3">
										<TableCell colSpan={4} className="p-0 border-0" />
									</TableRow>
								)}
								
								{isExpanded ? (
									// Expanded row
									<>
										<TableRow>
											{/* Date detected column with timeline - extends vertically */}
											<TableCell 
												className=" align-top" 
												
												rowSpan={2}
											>
												<div className="relative h-full pr-4" style={{ minHeight: '100%' }}>
													{/* Vertical timeline line - extends through expanded content */}
													<div className="absolute left-[1.125rem] top-0 bottom-0 w-0.5 bg-gray-300 h-[100vh]" />
													{/* Circle marker */}
													<div className="absolute left-[15px] top-4 w-2 h-2 bg-gray-300 rounded-full z-10" />
													{/* Date text */}
													<div className="ml-8 text-sm text-gray-600 font-content leading-tight">
														<div>{dateParts[0]}</div>
														<div>{dateParts[1]}</div>
													</div>
												</div>
											</TableCell>
											{/* CVE ID, Package, Status - wrapped in bordered container */}
											<TableCell colSpan={3} className="p-0 border-0">
												<div
													className="rounded border-2"
													style={{ borderColor: '#1CE8AB' }}
												>
													{/* Header Row */}
													<Table>
														<TableBody>
															<TableRow
																className="hover:bg-muted/50 cursor-pointer bg-white border-0"
																onClick={() => handleRowClick(advisory)}
															>
																<TableCell className="rounded-tl rounded-bl border-l" style={{ borderWidth: '1px', borderColor: 'transparent', borderRight: '0px' }}>
																	<div className="flex items-center space-x-2">
																		<X className="sm:h-4 sm:w-4 h-8 w-8 text-gray-500" />
																		<span className="font-mono text-sm font-medium font-content">
																			{advisory.cve_id}
																		</span>
																	</div>
																</TableCell>
																<TableCell className="border-r" style={{ borderWidth: '1px', borderColor: 'transparent' }}>
																	<div className="font-medium font-content">{advisory.package}</div>
																</TableCell>
																<TableCell className="rounded-tr rounded-br border-r " style={{ borderWidth: '1px', borderColor: 'transparent' }}>
																	<div
																		className="rounded-md px-2 py-1 text-sm font-medium font-content inline-block"
																		style={getStatusBadgeStyle(advisory.status)}
																	>
																		{advisory.status}
																	</div>
																</TableCell>
															</TableRow>
														</TableBody>
													</Table>
													
													{/* Divider */}
													<div className="border-t border-gray-200" />
													
													{/* Detail Section */}
													<div className="p-6 space-y-4">
													{/* Description */}
													<div>
														<h3 className="font-semibold mb-2 text-sm font-content">Description</h3>
														{isLoading ? (
															<div className="text-sm text-muted-foreground font-content">Loading description...</div>
														) : details ? (
															<div className="space-y-2">
																{details.description.split('\n\n').map((paragraph, pIndex) => (
																	<p key={pIndex} className="text-sm text-muted-foreground leading-relaxed font-content">
																		{paragraph}
																	</p>
																))}
															</div>
														) : (
															<p className="text-sm text-muted-foreground leading-relaxed font-content">
																No description available.
															</p>
														)}
													</div>
													
													{/* References */}
													{details && details.references && details.references.length > 0 && (
														<div>
															<button
																onClick={(e) => {
																	e.stopPropagation()
																	toggleReferences(advisory.cve_id)
																}}
																className="flex items-center gap-2 mb-2 font-semibold text-sm font-content hover:text-foreground"
															>
																References
																<ChevronUp
																	className={`h-4 w-4 transition-transform ${isReferencesExpanded ? 'rotate-0' : 'rotate-180'}`}
																/>
															</button>
															{isReferencesExpanded && (
																<ul className="space-y-1 ml-4">
																	{details.references.map((reference, refIndex) => (
																		<li key={refIndex} className="list-disc">
																			<a
																				href={reference}
																				target="_blank"
																				rel="noopener noreferrer"
																				className="text-blue-600 hover:underline text-sm font-content"
																				onClick={(e) => e.stopPropagation()}
																			>
																				{reference}
																			</a>
																		</li>
																	))}
																</ul>
															)}
														</div>
													)}

													{/* Advisory Changes Timeline */}
													{details && details.advisory_changes && details.advisory_changes.length > 0 && (
														<div>
															<h3 className="font-semibold mb-4 text-sm font-content">Advisory Changes</h3>
															<div className="relative">
																{/* Vertical timeline line */}
																<div className="absolute left-[0.2rem] top-0 bottom-0 w-0.5 bg-gray-200" />
																<div className="space-y-4 pl-8">
																	{details.advisory_changes.map((change, changeIndex) => {
																		const changeDate = new Date(change.date)
																		const day = changeDate.getDate()
																		const month = changeDate.toLocaleString('en-US', { month: 'long' })
																		const year = changeDate.getFullYear()
																		const ordinal = day === 1 || day === 21 || day === 31 ? 'st' : 
																							day === 2 || day === 22 ? 'nd' : 
																							day === 3 || day === 23 ? 'rd' : 'th'
																		const formattedDate = `${day}${ordinal} ${month} ${year}`
																		const isLatest = changeIndex === 0
																		
																		return (
																			<div key={changeIndex} className="relative">
																				{/* Circle marker */}
																				<div className="absolute left-[-2rem] top-0 w-2 h-2 bg-gray-300 rounded-full z-10" />
																				{/* Change card */}
																				<div className="border border-gray-200 rounded-md p-4 bg-white">
																					<div className="mb-2">
																						<span className="text-sm text-gray-600 font-content">
																							{isLatest ? 'Latest Update: ' : 'Past Update: '}
																							{formattedDate}
																						</span>
																					</div>
																					<div className="mb-2 flex items-center gap-2">
																						<span className="text-sm text-gray-600 font-content">Status: </span>
																						<div
																							className="rounded-md px-2 py-1 text-sm font-medium font-content inline-block "
																							style={getStatusBadgeStyle(change.status)}
																						>
																							{change.status}
																						</div>
																						{change.fixed_version && (
																							<span className="text-sm text-gray-900 font-content">
																								Fixed Version: {change.fixed_version}
																							</span>
																						)}
																					</div>
																					{change.impact && (
																						<div className="mt-2">
																							<span className="text-sm font-semibold text-gray-900 font-content">Impact: </span>
																							<p className="text-sm text-gray-600 mt-1 font-content leading-relaxed">
																								{change.impact}
																							</p>
																						</div>
																					)}
																				</div>
																			</div>
																		)
																	})}
																</div>
															</div>
														</div>
													)}
													</div>
												</div>
											</TableCell>
										</TableRow>
										{/* Spacer row after expanded row */}
										<TableRow className="border-0 h-3">
											<TableCell colSpan={4} className="p-0 border-0" />
										</TableRow>
									</>
								) : (
									// Collapsed row
									<TableRow
										className="hover:bg-muted/50 cursor-pointer"
										onClick={() => handleRowClick(advisory)}
									>
										{/* Date detected column with timeline */}
										<TableCell className="border-l border-b border-r" style={{ borderWidth: '0px', borderRight: 'none' }}>
											<div className="relative pr-4">
												{/* Vertical timeline line */}
												<div className="absolute left-[1.125rem] top-0 bottom-0 w-0.5 bg-gray-300 h-[100px]" />
												{/* Circle marker */}
												<div className="absolute left-[15px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full z-10" />
												{/* Date text */}
												<div className="ml-8 text-sm text-gray-600 font-content leading-tight">
													<div>{dateParts[0]}</div>
													<div>{dateParts[1]}</div>
												</div>
											</div>
										</TableCell>
										<TableCell className="border-b border-r border-l rounded-tl rounded-bl" style={{ borderWidth: '1px', borderRight: 'none' }}>
											<div className="flex items-center space-x-2 ">
												<Plus className="sm:h-4 sm:w-4 h-8 w-8" style={{ color: '#1CE8AB' }} />
												<span className="font-mono text-sm font-medium font-content">
													{advisory.cve_id}
												</span>
											</div>
										</TableCell>
										<TableCell className="border-b border-r " style={{ borderWidth: '1px', borderRight: 'none', borderLeft: 'none' }}>
											<div className="font-medium font-content">{advisory.package}</div>
										</TableCell>
										<TableCell className="border-b border-r rounded-tr rounded-br" style={{ borderWidth: '1px', borderLeft: 'none' }}>
											<div
												className="rounded-md px-2 py-1 text-sm font-medium font-content inline-block"
												style={getStatusBadgeStyle(advisory.status)}
											>
												{advisory.status}
											</div>
										</TableCell>
									</TableRow>
								)}
							</React.Fragment>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}
