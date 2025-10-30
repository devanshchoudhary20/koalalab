'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { DailyCVECount } from '@/types/api'

interface SeverityBreakdownChartProps {
	koalalabData: DailyCVECount[]
	alternativeData: DailyCVECount[]
	alternativeName: string
}

const severityColors = {
	critical: '#E07171',
	high: '#FFA071',
	medium: '#FEC98F',
	low: '#FCE1A9',
	unknown: '#D3D3D3',
}


// Generate mock data for the timeline if not enough data points
const generateMockTimelineData = (data: DailyCVECount[], isKoalalab: boolean): DailyCVECount[] => {
	if (data.length >= 10) return data
	
	const mockData: DailyCVECount[] = []
	const startDate = new Date('2025-07-27')
	
	for (let i = 0; i < 10; i++) {
		const date = new Date(startDate)
		date.setDate(date.getDate() + i * 3) // Every 3 days
		
		if (isKoalalab) {
			// KoalaLab has minimal CVEs for demonstration - create single block effect
			const hasData = Math.random() > 0.3 // 70% chance of having data
			if (hasData) {
				const koalalabValue = Math.floor(Math.random() * 5) + 1 // 1-5 CVEs
				mockData.push({
					date: date.toISOString().split('T')[0],
					critical: Math.floor(koalalabValue * 0.1),
					high: Math.floor(koalalabValue * 0.2),
					medium: Math.floor(koalalabValue * 0.4),
					low: Math.floor(koalalabValue * 0.2),
					unknown: Math.floor(koalalabValue * 0.1),
					total: koalalabValue,
				})
			} else {
				// No severity data - will create single block
				mockData.push({
					date: date.toISOString().split('T')[0],
					critical: 0,
					high: 0,
					medium: 0,
					low: 0,
					unknown: 0,
					total: 0,
				})
			}
		} else {
			// Alternative has varying CVEs
			const baseValue = Math.floor(Math.random() * 200) + 50
			mockData.push({
				date: date.toISOString().split('T')[0],
				critical: Math.floor(baseValue * 0.1),
				high: Math.floor(baseValue * 0.2),
				medium: Math.floor(baseValue * 0.4),
				low: Math.floor(baseValue * 0.2),
				unknown: Math.floor(baseValue * 0.1),
				total: baseValue,
			})
		}
	}
	
	return mockData
}

const formatDate = (dateString: string): string => {
	const date = new Date(dateString)
	return date.toLocaleDateString('en-US', { 
		month: 'short', 
		day: 'numeric' 
	})
}

interface CustomTooltipProps {
	active?: boolean
	payload?: Array<{
		payload: {
			date: string
			koalalabCritical?: number
			koalalabHigh?: number
			koalalabMedium?: number
			koalalabLow?: number
			koalalabUnknown?: number
			alternativeCritical?: number
			alternativeHigh?: number
			alternativeMedium?: number
			alternativeLow?: number
			alternativeUnknown?: number
		}
	}>
	label?: string | number
	chartType?: string
	hoveredDate?: string | null
	chartData?: Array<{
		date: string
		koalalabCritical?: number
		koalalabHigh?: number
		koalalabMedium?: number
		koalalabLow?: number
		koalalabUnknown?: number
		alternativeCritical?: number
		alternativeHigh?: number
		alternativeMedium?: number
		alternativeLow?: number
		alternativeUnknown?: number
	}>
}

const CustomTooltip = ({ active, payload, label, chartType, hoveredDate, chartData }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		// Use hovered date data if available, otherwise use current payload data
			const data = hoveredDate && chartData ? 
				chartData.find((item) => item.date === hoveredDate) || payload[0].payload :
				payload[0].payload
			
		// Show only the respective chart data based on chartType
		if (chartType === 'KoalaLab') {
			const koalalabData = {
				critical: data.koalalabCritical || 0,
				high: data.koalalabHigh || 0,
				medium: data.koalalabMedium || 0,
				low: data.koalalabLow || 0,
				unknown: data.koalalabUnknown || 0,
			}
			const koalalabTotal = Object.values(koalalabData).reduce((sum, val) => sum + val, 0)
			
			return (
				<div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg min-w-[200px]">
					<p className="font-medium text-sm mb-3">{formatDate(String(label || ''))}</p>
					
					{/* KoalaLab Data Only */}
					<div>
						<div className="flex items-center space-x-2 mb-2">
							<div className="w-3 h-3 bg-blue-600 rounded-sm transform rotate-45" />
							<span className="text-sm font-medium">KoalaLab</span>
						</div>
						<div className="space-y-1 ml-5">
							{Object.entries(koalalabData).map(([severity, value]) => (
								<div key={severity} className="flex items-center space-x-2">
									<div 
										className="w-2 h-2 rounded-full" 
										style={{ backgroundColor: severityColors[severity as keyof typeof severityColors] }}
									/>
									<span className="text-xs capitalize">{severity}: {value}</span>
								</div>
							))}
							<div className="border-t pt-1 mt-1">
								<span className="text-xs font-medium">Total: {koalalabTotal}</span>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			// Alternative chart data
			const alternativeData = {
				critical: data.alternativeCritical || 0,
				high: data.alternativeHigh || 0,
				medium: data.alternativeMedium || 0,
				low: data.alternativeLow || 0,
				unknown: data.alternativeUnknown || 0,
			}
			const alternativeTotal = Object.values(alternativeData).reduce((sum, val) => sum + val, 0)
			
			return (
				<div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg min-w-[200px]">
					<p className="font-medium text-sm mb-3">{formatDate(String(label || ''))}</p>
					
					{/* Alternative Data Only */}
					<div>
						<div className="flex items-center space-x-2 mb-2">
							<div className="w-3 h-3 bg-purple-400 rounded-sm transform rotate-45" />
							<span className="text-sm font-medium">{chartType || 'Alternative'}</span>
						</div>
						<div className="space-y-1 ml-5">
							{Object.entries(alternativeData).map(([severity, value]) => (
								<div key={severity} className="flex items-center space-x-2">
									<div 
										className="w-2 h-2 rounded-full" 
										style={{ backgroundColor: severityColors[severity as keyof typeof severityColors] }}
									/>
									<span className="text-xs capitalize">{severity}: {value}</span>
								</div>
							))}
							<div className="border-t pt-1 mt-1">
								<span className="text-xs font-medium">Total: {alternativeTotal}</span>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}
	return null
}


export default function SeverityBreakdownChart({ 
	koalalabData, 
	alternativeData, 
	alternativeName 
}: SeverityBreakdownChartProps) {
	const [hoveredDate, setHoveredDate] = useState<string | null>(null)
	
	// Generate mock timeline data if needed
	const koalalabTimeline = generateMockTimelineData(koalalabData, true)
	const alternativeTimeline = generateMockTimelineData(alternativeData, false)

	// Prepare data for stacked bar chart
	const chartData = koalalabTimeline.map((koalalabItem, index) => {
		const alternativeItem = alternativeTimeline[index] || koalalabItem
		
		// Check if KoalaLab has no severity data (all zeros)
		const hasKoalalabData = koalalabItem.total > 0
		
		return {
			date: koalalabItem.date,
			koalalab: koalalabItem.total,
			alternative: alternativeItem.total,
			// For stacked bars, we need individual severity values
			koalalabCritical: hasKoalalabData ? koalalabItem.critical : 0,
			koalalabHigh: hasKoalalabData ? koalalabItem.high : 0,
			koalalabMedium: hasKoalalabData ? koalalabItem.medium : 0,
			koalalabLow: hasKoalalabData ? koalalabItem.low : 0,
			koalalabUnknown: hasKoalalabData ? koalalabItem.unknown : 1, // Single block for empty state
			alternativeCritical: alternativeItem.critical,
			alternativeHigh: alternativeItem.high,
			alternativeMedium: alternativeItem.medium,
			alternativeLow: alternativeItem.low,
			alternativeUnknown: alternativeItem.unknown,
		}
	})

	// Always show stacked bars for KoalaLab

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleMouseMove = (data: any) => {
		if (data && data.activePayload && data.activePayload[0]) {
			setHoveredDate(data.activePayload[0].payload.date)
		}
	}

	const handleMouseLeave = () => {
		setHoveredDate(null)
	}


	return (
		<Card className="w-full h-full">
			<CardHeader>
				<CardTitle className="text-lg font-semibold">CVEs by Severity</CardTitle>
				{/* Legend */}
				<div className="flex items-center justify-end space-x-4 mt-2">
					{Object.entries(severityColors).map(([severity, color]) => (
						<div key={severity} className="flex items-center space-x-1">
							<div 
								className="w-2 h-2 rounded-full" 
								style={{ backgroundColor: color }}
							/>
							<span className="text-xs text-gray-600 capitalize">{severity}</span>
						</div>
					))}
				</div>
			</CardHeader>
			<CardContent className="flex-1">
				<div className="space-y-6">
					{/* KoalaLab Chart */}
					<div>
						<div className="flex items-center space-x-2 mb-2">
							<div className="w-3 h-3 bg-blue-600 rounded-sm transform rotate-45" />
							<span className="text-sm font-medium">KoalaLab</span>
						</div>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<ComposedChart 
									data={chartData} 
									margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
									onMouseMove={handleMouseMove}
									onMouseLeave={handleMouseLeave}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis 
										dataKey="date" 
										tick={{ fontSize: 12 }}
										tickFormatter={formatDate}
										angle={-45}
										textAnchor="end"
										height={60}
									/>
									<YAxis tick={{ fontSize: 12 }} domain={[0, 250]} />
									<Tooltip 
										content={(props) => <CustomTooltip 
											{...props}
											chartType="KoalaLab" 
											hoveredDate={hoveredDate} 
											chartData={chartData} 
										/>} 
									/>
									<Bar dataKey="koalalabCritical" stackId="koalalab" fill={severityColors.critical} radius={[0, 0, 0, 0]} />
									<Bar dataKey="koalalabHigh" stackId="koalalab" fill={severityColors.high} radius={[0, 0, 0, 0]} />
									<Bar dataKey="koalalabMedium" stackId="koalalab" fill={severityColors.medium} radius={[0, 0, 0, 0]} />
									<Bar dataKey="koalalabLow" stackId="koalalab" fill={severityColors.low} radius={[0, 0, 0, 0]} />
									<Bar dataKey="koalalabUnknown" stackId="koalalab" fill={severityColors.unknown} radius={[2, 2, 0, 0]} />
								</ComposedChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Alternative Chart */}
					<div>
						<div className="flex items-center space-x-2 mb-2">
							<div className="w-3 h-3 bg-purple-400 rounded-sm transform rotate-45" />
							<span className="text-sm font-medium">{alternativeName}</span>
						</div>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<ComposedChart 
									data={chartData} 
									margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
									onMouseMove={handleMouseMove}
									onMouseLeave={handleMouseLeave}
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis 
										dataKey="date" 
										tick={{ fontSize: 12 }}
										tickFormatter={formatDate}
										angle={-45}
										textAnchor="end"
										height={60}
									/>
									<YAxis tick={{ fontSize: 12 }} domain={[0, 250]} />
									<Tooltip 
										content={(props) => <CustomTooltip 
											{...props}
											chartType={alternativeName} 
											hoveredDate={hoveredDate} 
											chartData={chartData} 
										/>} 
									/>
									<Bar dataKey="alternativeCritical" stackId="alternative" fill={severityColors.critical} radius={[0, 0, 0, 0]} />
									<Bar dataKey="alternativeHigh" stackId="alternative" fill={severityColors.high} radius={[0, 0, 0, 0]} />
									<Bar dataKey="alternativeMedium" stackId="alternative" fill={severityColors.medium} radius={[0, 0, 0, 0]} />
									<Bar dataKey="alternativeLow" stackId="alternative" fill={severityColors.low} radius={[0, 0, 0, 0]} />
									<Bar dataKey="alternativeUnknown" stackId="alternative" fill={severityColors.unknown} radius={[2, 2, 0, 0]} />
								</ComposedChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
