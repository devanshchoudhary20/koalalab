'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatPercentage } from '@/lib/utils/formatters'
import { generateSeverityBreakdown } from '@/lib/utils/mockComparisonData'
import type { ComparisonMetrics } from '@/types/api'

interface ComparisonMetricsChartsProps {
	data: ComparisonMetrics
}

const severityColors = {
	critical: '#DC2626', // Red color for critical
	high: '#EA580C', // Orange color for high
	medium: '#F59E0B', // Light orange color for medium
	low: '#EAB308', // Yellow color for low
	unspecified: '#FDE68A', // Light beige/yellow color for unspecified
}

const severityOrder = ['critical', 'high', 'medium', 'low', 'unspecified'] as const



interface MetricRowProps {
	label: string
	koalalabValue: number
	alternativeValue: number
	unit?: string
	showSeverityBreakdown?: boolean
	reductionPercent: number
}

function MetricRow({ 
	label,
	koalalabValue, 
	alternativeValue, 
	unit = '', 
	showSeverityBreakdown = false,
	reductionPercent 
}: MetricRowProps) {
	const maxValue = Math.max(koalalabValue, alternativeValue)
	const koalalabPercent = maxValue > 0 ? (koalalabValue / maxValue) * 100 : 0
	const alternativePercent = maxValue > 0 ? (alternativeValue / maxValue) * 100 : 0

	// For KoalaLab, if value is 0, show empty breakdown, otherwise generate breakdown
	const koalalabBreakdown = showSeverityBreakdown ? 
		(koalalabValue === 0 ? { critical: 0, high: 0, medium: 0, low: 0, unspecified: 0 } : generateSeverityBreakdown(koalalabValue)) : 
		null
	const alternativeBreakdown = showSeverityBreakdown ? generateSeverityBreakdown(alternativeValue) : null

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-100 last:border-b-0 gap-4 max-w-4xl mx-auto">
			

			{/* KoalaLab Column */}
			<div className="flex-1 flex flex-col sm:flex-col items-end space-y-2 sm:space-y-0 sm:space-x-4 max-w-[10rem] mx-auto">
				<div className="w-full sm:w-20 text-left sm:text-right">
					<span className="text-sm font-semibold text-gray-900">
						{koalalabValue.toLocaleString()}{unit}
					</span>
				</div>
				<div className="flex-1 max-w-xs w-full">
					<div className="h-6 bg-gray-100 rounded relative overflow-hidden flex justify-end" >
						{showSeverityBreakdown && koalalabBreakdown ? (
							koalalabValue === 0 ? (
								// Show thin gray bar for 0 values
								<div 
									className="h-full rounded"
									style={{ 
										width: '2%',
										backgroundColor: '#D3D3D3' // Light gray for 0 values
									}}
								/>
							) : (
								<div className="h-full flex relative">
									{severityOrder.map((severity) => {
										const value = koalalabBreakdown[severity]
										const width = 20
										
										return (
											<div key={severity} className="h-full relative" style={{ width: `${width}%` }}>
												<div
													className="h-full flex items-center justify-center"
													style={{
														backgroundColor: severityColors[severity],
													}}
												>
													{value > 0 && (
														<span className="text-xs font-semibold text-black">
															{value}
														</span>
													)}
												</div>
											</div>
										)
									})}
								</div>
							)
						) : (
							<div
								className="h-full rounded"
								style={{ 
									width: `${koalalabPercent}%`,
									backgroundColor: '#3548A2' // Blue color for KoalaLab
								}}
							/>
						)}
					</div>
				</div>
				
			</div>
			<div className="w-1/3">
			{reductionPercent > 0 && (
					<div className="text-xs text-[#3548A2]/70 font-medium  text-center">
						{/* Label Column */}
						<div className="w-full  flex-shrink-0 ">
							<span className="text-sm font-bold font-content ">{label}</span>
						</div>
						Reduced by <br /> 
						<span className="text-lg font-bold font-content text-[#3548A2]">{formatPercentage(reductionPercent)}</span>
					</div>
				)}
			</div>

			{/* Alternative Column */}
			<div className="flex-1 flex flex-col sm:flex-col items-start  space-y-2 sm:space-y-0 sm:space-x-0 w-full">
				<div className="w-full sm:w-20 text-left ">
					<span className="text-sm font-semibold text-gray-900">
						{alternativeValue.toLocaleString()}{unit}
					</span>
				</div>
				<div className="flex-1 max-w-xs w-full">
					<div className="h-6 bg-gray-100 rounded relative overflow-hidden ">
						{showSeverityBreakdown && alternativeBreakdown ? (
							<div className="h-full flex relative">
								{severityOrder.map((severity) => {
									const value = alternativeBreakdown[severity]
									const width = 20
									
									return (
										<div key={severity} className="h-full relative" style={{ width: `${width}%` }}>
											<div
												className="h-full flex items-center justify-center"
												style={{
													backgroundColor: severityColors[severity],
												}}
											>
												{value > 0 && (
													<span className="text-xs font-medium text-black">
														{value}
													</span>
												)}
											</div>
										</div>
									)
								})}
							</div>
						) : (
							<div
								className="h-full rounded text-right"
								style={{ 
									width: `${alternativePercent}%`,
									backgroundColor: '#3548A2',
									opacity: 0.5
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default function ComparisonMetricsCharts({ data }: ComparisonMetricsChartsProps) {
	return (
		<Card className="w-full h-full border-[#1CE8AB]">
			<CardHeader>
				
				{/* Header with KoalaLab and Alternative labels */}
				<div className="flex items-center justify-center space-x-8 mt-4 border-b pb-4">
					<div className="flex items-center space-x-2 gap-2">
					<span className="text-sm font-medium text-gray-700 text-end">KoalaLab <br />kla.dev/python:latest </span>
						<div>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.82688 13.5431L0 8.23875L0.777292 7.65208L6.82688 12.3444L12.8765 7.65208L13.6538 8.23875L6.82688 13.5431ZM6.82688 10.6088L0 5.30438L6.82688 0L13.6538 5.30438L6.82688 10.6088ZM6.82688 9.41021L12.109 5.30438L6.82688 1.20667L1.54479 5.30438L6.82688 9.41021Z" fill="#3443F4"/>
						</svg>
						</div>
						
					</div>
					<div className="flex items-center space-x-2 gap-2">
						<div>
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M6.82688 13.5431L0 8.23875L0.777292 7.65208L6.82688 12.3444L12.8765 7.65208L13.6538 8.23875L6.82688 13.5431ZM6.82688 10.6088L0 5.30438L6.82688 0L13.6538 5.30438L6.82688 10.6088ZM6.82688 9.41021L12.109 5.30438L6.82688 1.20667L1.54479 5.30438L6.82688 9.41021Z" fill="#F236F6"/>
						</svg>
						</div>
						<span className="text-sm font-medium text-gray-700 text-start">Alternative <br />python:latest</span>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-4 flex-1">
				<div className="divide-y divide-gray-100 mx-auto">
					

					{/* Metric Rows */}
					<MetricRow
						label="Total CVEs"
						koalalabValue={data.koalalab.total_cves}
						alternativeValue={data.alternative.total_cves}
						showSeverityBreakdown={true}
						reductionPercent={data.reduction.total_cves_percent}
					/>
					
					<MetricRow
						label="Compressed Size"
						koalalabValue={data.koalalab.compressed_size_mb}
						alternativeValue={data.alternative.compressed_size_mb}
						unit=" MB"
						reductionPercent={data.reduction.compressed_size_percent}
						showSeverityBreakdown={false}
					/>
					
					<MetricRow
						label="Number of Packages"
						koalalabValue={data.koalalab.number_of_packages}
						alternativeValue={data.alternative.number_of_packages}
						reductionPercent={data.reduction.number_of_packages_percent}
						showSeverityBreakdown={false}
					/>
					
					<MetricRow
						label="New CVEs per Month"
						koalalabValue={data.koalalab.new_cves_per_month}
						alternativeValue={data.alternative.new_cves_per_month}
						showSeverityBreakdown={true}
						reductionPercent={data.reduction.new_cves_per_month_percent}
					/>
				</div>
			</CardContent>
		</Card>
	)
}
