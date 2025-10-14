import { useState } from 'react'
import { useComparison } from '@/hooks/useComparison'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingDown, TrendingUp, Shield, Package, HardDrive, AlertTriangle } from 'lucide-react'
import { formatPercentage } from '@/lib/utils/formatters'

interface ComparisonTabProps {
	containerSlug: string
}

export default function ComparisonTab({ containerSlug }: ComparisonTabProps) {
	const [selectedTag, setSelectedTag] = useState('latest')
	const [alternative, setAlternative] = useState('official-python')
	const [period, setPeriod] = useState('30d')
	const [criticalHighOnly, setCriticalHighOnly] = useState(false)

	const { data, loading, error } = useComparison(containerSlug, selectedTag, {
		alternative,
		period,
		critical_high_only: criticalHighOnly,
	})

	const handleAlternativeChange = (newAlternative: string) => {
		setAlternative(newAlternative)
	}

	const handlePeriodChange = (newPeriod: string) => {
		setPeriod(newPeriod)
	}

	const handleCriticalHighToggle = () => {
		setCriticalHighOnly(!criticalHighOnly)
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
			{/* Controls */}
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="flex-1">
					<label className="text-sm font-medium text-muted-foreground mb-2 block">
						Compare Against
					</label>
					<select
						value={alternative}
						onChange={(e) => handleAlternativeChange(e.target.value)}
						className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
					>
						{data?.available_alternatives.map((alt) => (
							<option key={alt.slug} value={alt.slug}>
								{alt.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex-1">
					<label className="text-sm font-medium text-muted-foreground mb-2 block">
						Time Period
					</label>
					<select
						value={period}
						onChange={(e) => handlePeriodChange(e.target.value)}
						className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
					>
						{data?.available_periods.map((per) => (
							<option key={per.slug} value={per.slug}>
								{per.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex items-end">
					<Button
						variant={criticalHighOnly ? 'default' : 'outline'}
						onClick={handleCriticalHighToggle}
						className="w-full"
					>
						Critical & High Only
					</Button>
				</div>
			</div>

			{/* Comparison Metrics */}
			{data && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Total CVEs
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.comparison_metrics.koalalab.total_cves}</div>
							<div className="flex items-center text-sm text-muted-foreground">
								vs {data.comparison_metrics.alternative.total_cves}
								{data.comparison_metrics.reduction.total_cves_percent > 0 ? (
									<Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
										<TrendingDown className="h-3 w-3 mr-1" />
										{formatPercentage(data.comparison_metrics.reduction.total_cves_percent)} reduction
									</Badge>
								) : (
									<Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
										<TrendingUp className="h-3 w-3 mr-1" />
										{formatPercentage(Math.abs(data.comparison_metrics.reduction.total_cves_percent))} increase
									</Badge>
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Size (MB)
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.comparison_metrics.koalalab.compressed_size_mb}</div>
							<div className="flex items-center text-sm text-muted-foreground">
								vs {data.comparison_metrics.alternative.compressed_size_mb}MB
								{data.comparison_metrics.reduction.compressed_size_percent > 0 ? (
									<Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
										<TrendingDown className="h-3 w-3 mr-1" />
										{formatPercentage(data.comparison_metrics.reduction.compressed_size_percent)} smaller
									</Badge>
								) : (
									<Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
										<TrendingUp className="h-3 w-3 mr-1" />
										{formatPercentage(Math.abs(data.comparison_metrics.reduction.compressed_size_percent))} larger
									</Badge>
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								Packages
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.comparison_metrics.koalalab.number_of_packages}</div>
							<div className="flex items-center text-sm text-muted-foreground">
								vs {data.comparison_metrics.alternative.number_of_packages}
								{data.comparison_metrics.reduction.number_of_packages_percent > 0 ? (
									<Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
										<TrendingDown className="h-3 w-3 mr-1" />
										{formatPercentage(data.comparison_metrics.reduction.number_of_packages_percent)} fewer
									</Badge>
								) : (
									<Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
										<TrendingUp className="h-3 w-3 mr-1" />
										{formatPercentage(Math.abs(data.comparison_metrics.reduction.number_of_packages_percent))} more
									</Badge>
								)}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground">
								New CVEs/Month
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{data.comparison_metrics.koalalab.new_cves_per_month}</div>
							<div className="flex items-center text-sm text-muted-foreground">
								vs {data.comparison_metrics.alternative.new_cves_per_month}
								{data.comparison_metrics.reduction.new_cves_per_month_percent > 0 ? (
									<Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
										<TrendingDown className="h-3 w-3 mr-1" />
										{formatPercentage(data.comparison_metrics.reduction.new_cves_per_month_percent)} reduction
									</Badge>
								) : (
									<Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
										<TrendingUp className="h-3 w-3 mr-1" />
										{formatPercentage(Math.abs(data.comparison_metrics.reduction.new_cves_per_month_percent))} increase
									</Badge>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Summary */}
			{data && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Shield className="h-5 w-5" />
							<span>Security Comparison Summary</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="text-3xl font-bold text-green-600 mb-2">
									{formatPercentage(
										(data.comparison_metrics.reduction.total_cves_percent +
											data.comparison_metrics.reduction.compressed_size_percent +
											data.comparison_metrics.reduction.number_of_packages_percent +
											data.comparison_metrics.reduction.new_cves_per_month_percent) /
											4
									)}
								</div>
								<div className="text-sm text-muted-foreground">Average Improvement</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-blue-600 mb-2">
									{data.comparison_metrics.koalalab.total_cves}
								</div>
								<div className="text-sm text-muted-foreground">KoalaLab CVEs</div>
							</div>
							<div className="text-center">
								<div className="text-3xl font-bold text-severity-high mb-2">
									{data.comparison_metrics.alternative.total_cves}
								</div>
								<div className="text-sm text-muted-foreground">{data.selected_alternative.name} CVEs</div>
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{loading && (
				<div className="space-y-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
					))}
				</div>
			)}
		</div>
	)
}
