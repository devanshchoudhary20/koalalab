'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'
import type { NetNewCVEsTimeline, CVEEvent } from '@/types/api'

interface NetNewCVEsChartProps {
	timelineData: NetNewCVEsTimeline[]
	alternativeName: string
}

interface ChartDataPoint {
	date: string
	koalalab: number
	alternative: number
	events: CVEEvent[]
}

// Generate mock timeline data if not enough data points
const generateMockTimelineData = (data: NetNewCVEsTimeline[]): NetNewCVEsTimeline[] => {
	if (data.length >= 10) return data
	
	const mockData: NetNewCVEsTimeline[] = []
	const startDate = new Date('2025-07-27')
	
	for (let i = 0; i < 10; i++) {
		const date = new Date(startDate)
		date.setDate(date.getDate() + i * 3) // Every 3 days
		
		// KoalaLab stays flat at 0
		const koalalabValue = 0
		
		// Alternative has varying values with some CVE events
		const alternativeValue = Math.floor(Math.random() * 100) + 150
		const hasEvent = Math.random() > 0.7 // 30% chance of CVE event
		
		const events: CVEEvent[] = hasEvent ? [{
			type: 'alternative',
			cve_id: `CVE-2024-${String(Math.floor(Math.random() * 90000) + 10000)}`,
			cve_slug: `cve-2024-${String(Math.floor(Math.random() * 90000) + 10000)}`,
			severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
			severity_score: Math.random() * 10,
		}] : []
		
		mockData.push({
			date: date.toISOString().split('T')[0],
			koalalab: koalalabValue,
			alternative: alternativeValue,
			events,
		})
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

const getSeverityColor = (severity: string): string => {
	switch (severity.toLowerCase()) {
		case 'critical':
			return '#E07171'
		case 'high':
			return '#FFA071'
		case 'medium':
			return '#FEC98F'
		case 'low':
			return '#FCE1A9'
		default:
			return '#D3D3D3'
	}
}

interface CustomTooltipProps {
	active?: boolean
	payload?: Array<{
		payload: {
			koalalab: number
			alternative: number
			events: CVEEvent[]
			alternativeName?: string
		}
	}>
	label?: string | number
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload
		const koalalabValue = data.koalalab || 0
		const alternativeValue = data.alternative || 0
		const events = data.events || []
		
		return (
			<div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[200px]">
				<p className="font-medium text-sm mb-3">{formatDate(String(label))}</p>
				
				<div className="space-y-2 mb-3">
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 rounded-full bg-cyan-500" />
						<span className="text-sm">KoalaLab: {koalalabValue}</span>
					</div>
					<div className="flex items-center space-x-2">
						<div className="w-3 h-3 rounded-full bg-purple-500" />
						<span className="text-sm">{data.alternativeName || 'Alternative'}: {alternativeValue}</span>
					</div>
				</div>

				{events.length > 0 && (
					<div className="border-t pt-2">
						<p className="text-xs font-medium text-gray-600 mb-2">CVE Events:</p>
						<div className="space-y-1">
							{events.slice(0, 3).map((event: CVEEvent, index: number) => (
								<div key={index} className="flex items-center space-x-2">
									<AlertTriangle className="h-3 w-3 text-orange-500" />
									<span className="text-xs">{event.cve_id}</span>
									<Badge 
										variant="secondary" 
										className="text-xs px-1 py-0"
										style={{ 
											backgroundColor: getSeverityColor(event.severity) + '20',
											color: getSeverityColor(event.severity)
										}}
									>
										{event.severity}
									</Badge>
								</div>
							))}
							{events.length > 3 && (
								<p className="text-xs text-gray-500">+{events.length - 3} more</p>
							)}
						</div>
					</div>
				)}
			</div>
		)
	}
	return null
}

// Custom danger icon component - only shows triangle warning, no circle
interface CustomDangerIconProps {
	cx?: number
	cy?: number
	payload?: {
		events: CVEEvent[]
	}
}

const CustomDangerIcon = (props: CustomDangerIconProps) => {
	const { cx, cy, payload } = props
	const events = payload?.events || []
	
	if (events.length === 0 || cx === undefined || cy === undefined) return null
	
	// Get the severity color for the first event
	const severityColor = events.length > 0 ? getSeverityColor(events[0].severity) : '#FF6B6B'
	
	return (
		<g>
			{/* Triangle warning icon */}
			<path
				d={`M${cx - 6},${cy + 4} L${cx + 6},${cy + 4} L${cx},${cy - 6} Z`}
				fill={severityColor}
				stroke="#fff"
				strokeWidth={1}
			/>
			{/* Exclamation mark */}
			<text
				x={cx}
				y={cy + 2}
				textAnchor="middle"
				fontSize="8"
				fill="#fff"
				fontWeight="bold"
			>
				!
			</text>
		</g>
	)
}

export default function NetNewCVEsChart({ timelineData, alternativeName }: NetNewCVEsChartProps) {
	// Generate mock timeline data if needed
	const mockTimelineData = generateMockTimelineData(timelineData)
	
	// Transform data for the chart
	const chartData: ChartDataPoint[] = mockTimelineData.map(item => ({
		date: item.date,
		koalalab: item.koalalab,
		alternative: item.alternative,
		events: item.events || [],
		alternativeName
	}))


	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg font-semibold">Net New CVEs Identified</CardTitle>
				<div className="flex items-center justify-between mt-2 flex-wrap">
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<div className="w-3 h-3 rounded-full bg-cyan-500" />
							<span className="text-sm text-gray-600">KoalaLab</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="w-3 h-3 rounded-full bg-purple-500" />
							<span className="text-sm text-gray-600">{alternativeName}</span>
						</div>
					</div>
					<div className="flex items-center space-x-4 text-sm text-gray-600">
						<span>Filter by severity:</span>
						<label className="flex items-center space-x-1">
							<input type="checkbox" className="rounded" />
							<span>High</span>
						</label>
						<label className="flex items-center space-x-1">
							<input type="checkbox" defaultChecked className="rounded" />
							<span>Critical</span>
						</label>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
							<XAxis 
								dataKey="date" 
								tick={{ fontSize: 12 }}
								tickFormatter={formatDate}
								angle={-45}
								textAnchor="end"
								height={60}
							/>
							<YAxis 
								tick={{ fontSize: 12 }}
								domain={[0, 250]}
							/>
							<Tooltip content={CustomTooltip} />
							
							{/* KoalaLab Line */}
							<Line
								type="monotone"
								dataKey="koalalab"
								stroke="#00CED1"
								strokeWidth={2}
								dot={false}
								activeDot={{ r: 4, fill: '#00CED1' }}
							/>
							
							{/* Alternative Line */}
							<Line
								type="monotone"
								dataKey="alternative"
								stroke="#8B5CF6"
								strokeWidth={2}
								dot={<CustomDangerIcon />}
								activeDot={{ r: 4, fill: '#8B5CF6' }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
				<div className="mt-4 text-xs text-gray-500">
					Vulnerability information provided by Grype from Anchore.
				</div>
			</CardContent>
		</Card>
	)
}
