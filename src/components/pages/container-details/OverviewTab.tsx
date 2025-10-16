import { useContainer } from '@/hooks/useContainers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
	Shield, 
	Package, 
	HardDrive, 
	Clock, 
	Tag, 
	Download, 
	ExternalLink,
	Info,
	CheckCircle,
} from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils/formatters'

interface OverviewTabProps {
	containerSlug: string
}

export default function OverviewTab({ containerSlug }: OverviewTabProps) {
	const { data: container, loading, error } = useContainer(containerSlug)

	if (loading) {
		return (
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
					))}
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
				<p className="text-muted-foreground">{error}</p>
			</div>
		)
	}

	if (!container) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold mb-2">Container Not Found</h2>
				<p className="text-muted-foreground">
					The container you&apos;re looking for doesn&apos;t exist.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Container Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Info className="h-5 w-5" />
						<span>Container Information</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-semibold mb-2">Description</h3>
							<p className="text-muted-foreground">{container.description}</p>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Usage</h3>
							<p className="text-muted-foreground">{container.usage}</p>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Latest Tag</h3>
							<div className="flex items-center space-x-2">
								<code className="bg-muted px-2 py-1 rounded text-sm">
									{container.latest_tag}
								</code>
								<Button variant="ghost" size="sm">
									<Download className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Last Changed</h3>
							<div className="flex items-center space-x-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">
									{formatRelativeTime(container.last_changed)}
								</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Security Status */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Shield className="h-5 w-5" />
						<span>Security Status</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center">
							<div className="text-3xl font-bold text-green-600 mb-2">0</div>
							<div className="text-sm text-muted-foreground">Critical Vulnerabilities</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-severity-high mb-2">2</div>
							<div className="text-sm text-muted-foreground">High Vulnerabilities</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-severity-medium mb-2">5</div>
							<div className="text-sm text-muted-foreground">Medium Vulnerabilities</div>
						</div>
					</div>
					{container.fips_available && (
						<div className="mt-4 flex items-center space-x-2">
							<CheckCircle className="h-5 w-5 text-green-600" />
							<span className="font-medium">FIPS 140-2 Compliant</span>
							<Badge variant="secondary" className="bg-green-100 text-green-800">
								Available
							</Badge>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Container Statistics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
							<Tag className="h-4 w-4 mr-2" />
							Available Tags
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{container.additional_tags_count + 1}</div>
						<div className="text-sm text-muted-foreground">
							Including {container.additional_tags_count} additional versions
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
							<Package className="h-4 w-4 mr-2" />
							Estimated Packages
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">~150</div>
						<div className="text-sm text-muted-foreground">
							Software components in latest tag
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
							<HardDrive className="h-4 w-4 mr-2" />
							Estimated Size
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">~45MB</div>
						<div className="text-sm text-muted-foreground">
							Compressed image size
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Tags */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Tag className="h-5 w-5" />
						<span>Tags</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-2">
						{container.tags?.map((tag, index) => (
							<Badge key={index} variant="outline">
								{tag}
							</Badge>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Quick Actions */}
			<Card>
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-4">
						<Button className="bg-primary text-primary-foreground">
							<Download className="h-4 w-4 mr-2" />
							Download SBOM
						</Button>
						<Button variant="outline">
							<ExternalLink className="h-4 w-4 mr-2" />
							View Security Report
						</Button>
						<Button variant="outline">
							<Shield className="h-4 w-4 mr-2" />
							Security Scan
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
