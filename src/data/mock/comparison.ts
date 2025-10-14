import type { ComparisonData, Alternative, Period, ComparisonMetrics, Metrics, ReductionMetrics, SeverityTimeline, DailyCVECount, NetNewCVEsTimeline, CVEEvent } from '@/types/api'

const availableAlternatives: Alternative[] = [
	{ name: 'Official Python', slug: 'official-python' },
	{ name: 'Ubuntu Python', slug: 'ubuntu-python' },
	{ name: 'Debian Python', slug: 'debian-python' },
	{ name: 'CentOS Python', slug: 'centos-python' },
]

const availablePeriods: Period[] = [
	{ name: 'Last 30 days', slug: '30d' },
	{ name: 'Last 90 days', slug: '90d' },
	{ name: 'Last 6 months', slug: '6m' },
	{ name: 'Last year', slug: '1y' },
]

function generateDailyCVEData(days: number, isAlternative: boolean = false): DailyCVECount[] {
	const data: DailyCVECount[] = []
	const baseDate = new Date()
	baseDate.setDate(baseDate.getDate() - days)

	for (let i = 0; i < days; i++) {
		const date = new Date(baseDate)
		date.setDate(date.getDate() + i)
		
		// KoalaLab generally has fewer vulnerabilities
		const multiplier = isAlternative ? 1.5 : 1.0
		
		data.push({
			date: date.toISOString().split('T')[0],
			critical: Math.floor(Math.random() * 3 * multiplier),
			high: Math.floor(Math.random() * 8 * multiplier),
			medium: Math.floor(Math.random() * 15 * multiplier),
			low: Math.floor(Math.random() * 50 * multiplier),
			unknown: Math.floor(Math.random() * 5 * multiplier),
			total: 0, // Will be calculated
		})
	}

	// Calculate totals
	return data.map(item => ({
		...item,
		total: item.critical + item.high + item.medium + item.low + item.unknown,
	}))
}

function generateNetNewCVEsTimeline(days: number): NetNewCVEsTimeline[] {
	const data: NetNewCVEsTimeline[] = []
	const baseDate = new Date()
	baseDate.setDate(baseDate.getDate() - days)

	for (let i = 0; i < days; i++) {
		const date = new Date(baseDate)
		date.setDate(date.getDate() + i)
		
		const koalaLabCount = Math.floor(Math.random() * 5) + 1
		const alternativeCount = Math.floor(Math.random() * 15) + 5
		
		const events: CVEEvent[] = []
		
		// Generate some events for KoalaLab
		for (let j = 0; j < koalaLabCount; j++) {
			events.push({
				type: 'koalalab',
				cve_id: `CVE-2024-${1000 + j}`,
				cve_slug: `cve-2024-${1000 + j}`,
				severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
				severity_score: Math.random() * 10,
			})
		}
		
		// Generate some events for alternative
		for (let j = 0; j < alternativeCount; j++) {
			events.push({
				type: 'alternative',
				cve_id: `CVE-2024-${2000 + j}`,
				cve_slug: `cve-2024-${2000 + j}`,
				severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
				severity_score: Math.random() * 10,
			})
		}
		
		data.push({
			date: date.toISOString().split('T')[0],
			koalalab: koalaLabCount,
			alternative: alternativeCount,
			events,
		})
	}

	return data
}

export function getComparisonData(
	containerSlug: string,
	tagSlug: string,
	alternative: string = 'official-python',
	period: string = '30d'
): ComparisonData {
	const periodDays = {
		'30d': 30,
		'90d': 90,
		'6m': 180,
		'1y': 365,
	}[period] || 30

	const koalaLabMetrics: Metrics = {
		total_cves: 25,
		compressed_size_mb: 45.2,
		number_of_packages: 150,
		new_cves_per_month: 2.5,
	}

	const alternativeMetrics: Metrics = {
		total_cves: 78,
		compressed_size_mb: 89.7,
		number_of_packages: 234,
		new_cves_per_month: 8.2,
	}

	const reductionMetrics: ReductionMetrics = {
		total_cves_percent: 68,
		compressed_size_percent: 50,
		number_of_packages_percent: 36,
		new_cves_per_month_percent: 70,
	}

	const comparisonMetrics: ComparisonMetrics = {
		koalalab: koalaLabMetrics,
		alternative: alternativeMetrics,
		reduction: reductionMetrics,
	}

	const cvesBySeverityTimeline: SeverityTimeline = {
		koalalab: generateDailyCVEData(periodDays, false),
		alternative: generateDailyCVEData(periodDays, true),
	}

	const netNewCVEsTimeline = generateNetNewCVEsTimeline(periodDays)

	return {
		available_alternatives: availableAlternatives,
		available_periods: availablePeriods,
		selected_alternative: availableAlternatives.find(alt => alt.slug === alternative) || availableAlternatives[0],
		selected_period: availablePeriods.find(per => per.slug === period) || availablePeriods[0],
		comparison_metrics: comparisonMetrics,
		cves_by_severity_timeline: cvesBySeverityTimeline,
		net_new_cves_timeline: netNewCVEsTimeline,
	}
}
