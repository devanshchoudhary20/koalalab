import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, ExternalLink, Clock, Loader2 } from 'lucide-react'
import { Advisory, AdvisoryDetails } from '@/types/api'
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters'
import { fetchAdvisoryDetails } from '@/lib/api/containers'

interface AdvisoryTableProps {
	advisories: Advisory[]
}

export default function AdvisoryTable({ advisories }: AdvisoryTableProps) {
	const [selectedAdvisory, setSelectedAdvisory] = useState<Advisory | null>(null)
	const [advisoryDetails, setAdvisoryDetails] = useState<AdvisoryDetails | null>(null)
	const [loadingDetails, setLoadingDetails] = useState(false)
	const [detailsError, setDetailsError] = useState<string | null>(null)

	const handleAdvisoryClick = async (advisory: Advisory) => {
		setSelectedAdvisory(advisory)
		setLoadingDetails(true)
		setDetailsError(null)
		setAdvisoryDetails(null)

		try {
			const details = await fetchAdvisoryDetails(
				advisory.package_slug,
				advisory.cve_slug
			)
			setAdvisoryDetails(details)
		} catch (error) {
			setDetailsError(error instanceof Error ? error.message : 'Failed to fetch advisory details')
		} finally {
			setLoadingDetails(false)
		}
	}

	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>CVE ID</TableHead>
							<TableHead>Package</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date Detected</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{advisories.map((advisory, index) => (
							<TableRow key={index} className="hover:bg-muted/50">
								<TableCell>
									<div className="flex items-center space-x-2">
										<AlertCircle className="h-4 w-4 text-destructive" />
										<span className="font-mono text-sm font-medium">
											{advisory.cve_id}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div className="font-medium">{advisory.package}</div>
								</TableCell>
								<TableCell>
									<Badge 
										variant="outline" 
										className={getStatusColor(advisory.status)}
									>
										{advisory.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className="flex items-center space-x-2">
										<Clock className="h-4 w-4 text-muted-foreground" />
										<span className="text-sm">
											{formatRelativeTime(advisory.date_detected)}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleAdvisoryClick(advisory)}
									>
										<ExternalLink className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Advisory Details Modal */}
			{selectedAdvisory && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-background rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold">
									{selectedAdvisory.cve_id}
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setSelectedAdvisory(null)
										setAdvisoryDetails(null)
										setDetailsError(null)
									}}
								>
									×
								</Button>
							</div>
							
							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-muted-foreground">Package</label>
										<div className="mt-1 font-medium">{selectedAdvisory.package}</div>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">Status</label>
										<div className="mt-1">
											<Badge 
												variant="outline" 
												className={getStatusColor(selectedAdvisory.status)}
											>
												{selectedAdvisory.status}
											</Badge>
										</div>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">Date Detected</label>
										<div className="mt-1 text-sm">
											{formatRelativeTime(selectedAdvisory.date_detected)}
										</div>
									</div>
									<div>
										<label className="text-sm font-medium text-muted-foreground">CVE Slug</label>
										<div className="mt-1 font-mono text-sm">{selectedAdvisory.cve_slug}</div>
									</div>
								</div>

								{/* Advisory Details Section */}
								{loadingDetails && (
									<div className="flex items-center justify-center py-8">
										<Loader2 className="h-6 w-6 animate-spin mr-2" />
										<span className="text-muted-foreground">Loading advisory details...</span>
									</div>
								)}

								{detailsError && (
									<div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
										<p className="text-destructive text-sm">{detailsError}</p>
									</div>
								)}

								{advisoryDetails && (
									<div className="space-y-4">
										<div>
											<label className="text-sm font-medium text-muted-foreground">Description</label>
											<div className="mt-2 p-4 bg-muted/50 rounded-lg">
												<p className="text-sm whitespace-pre-wrap">{advisoryDetails.description}</p>
											</div>
										</div>

										{advisoryDetails.references && advisoryDetails.references.length > 0 && (
											<div>
												<label className="text-sm font-medium text-muted-foreground">References</label>
												<div className="mt-2 space-y-2">
													{advisoryDetails.references.map((reference, index) => (
														<div key={index} className="flex items-center space-x-2">
															<ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
															<a
																href={reference}
																target="_blank"
																rel="noopener noreferrer"
																className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
															>
																{reference}
															</a>
														</div>
													))}
												</div>
											</div>
										)}

										{advisoryDetails.advisory_changes && advisoryDetails.advisory_changes.length > 0 && (
											<div>
												<label className="text-sm font-medium text-muted-foreground">Advisory Timeline</label>
												<div className="mt-2 space-y-3">
													{advisoryDetails.advisory_changes.map((change, index) => (
														<div key={index} className="border-l-2 border-muted pl-4 pb-4">
															<div className="flex items-center justify-between mb-2">
																<div className="flex items-center space-x-2">
																	<Badge 
																		variant="outline" 
																		className={getStatusColor(change.status)}
																	>
																		{change.status}
																	</Badge>
																	{change.fixed_version && (
																		<span className="text-xs text-green-600 font-mono">
																			Fixed in: {change.fixed_version}
																		</span>
																	)}
																</div>
																<span className="text-xs text-muted-foreground">
																	{formatRelativeTime(change.date)}
																</span>
															</div>
															{change.impact && (
																<div className="text-sm text-muted-foreground mb-1">
																	{change.impact}
																</div>
															)}
															{change.clarification && (
																<div className="text-xs text-blue-600 italic">
																	{change.clarification}
																</div>
															)}
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								)}
								
								<div className="pt-4 border-t flex space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => window.open(selectedAdvisory.advisory_details_url, '_blank')}
									>
										<ExternalLink className="h-4 w-4 mr-2" />
										View Advisory Details
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
