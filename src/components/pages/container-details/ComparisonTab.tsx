import { useState } from 'react'
import { useComparison } from '@/hooks/useComparison'
import ComparisonMetricsCharts from './comparison/ComparisonMetricsCharts'
import SeverityBreakdownChart from './comparison/SeverityBreakdownChart'
import NetNewCVEsChart from './comparison/NetNewCVEsChart'

interface ComparisonTabProps {
	containerSlug: string
}

export default function ComparisonTab({ containerSlug }: ComparisonTabProps) {
	const [selectedTag] = useState('latest')
	const [alternative, setAlternative] = useState('python-latest')
	const [period, setPeriod] = useState('last-30-days')
	const [criticalHighOnly] = useState(false)

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
			<div className="flex flex-col lg:flex-row gap-4 max-w-4xl mr-auto">
				<div className="flex-1">					
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
				
			</div>

			{/* First Row: Comparison Metrics (left) + Severity Breakdown (right) */}
			{data && (
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 ">
					<div className="w-full ">
						<ComparisonMetricsCharts data={data.comparison_metrics} />
					</div>	
					<div className="w-full">
						<SeverityBreakdownChart 
							koalalabData={data.cves_by_severity_timeline.koalalab}
							alternativeData={data.cves_by_severity_timeline.alternative}
							alternativeName={data.selected_alternative.name}
						/>
					</div>
				</div>
			)}

			{/* Second Row: Net New CVEs Timeline (full width) */}
			{data && (
				<NetNewCVEsChart 
					timelineData={data.net_new_cves_timeline}
					alternativeName={data.selected_alternative.name}
				/>
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
