import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertCircle, ExternalLink, Clock } from 'lucide-react'
import { Advisory } from '@/types/api'
import { formatRelativeTime, getStatusColor } from '@/lib/utils/formatters'

interface AdvisoryTableProps {
	advisories: Advisory[]
}

export default function AdvisoryTable({ advisories }: AdvisoryTableProps) {
	const [selectedAdvisory, setSelectedAdvisory] = useState<Advisory | null>(null)

	const handleAdvisoryClick = (advisory: Advisory) => {
		setSelectedAdvisory(advisory)
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
					<div className="bg-background rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold">
									{selectedAdvisory.cve_id}
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setSelectedAdvisory(null)}
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
								
								<div className="pt-4 border-t">
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
