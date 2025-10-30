/**
 * Mock data utilities for comparison charts
 * Used when API doesn't provide detailed severity breakdowns for metrics
 */

export interface SeverityBreakdown {
	critical: number
	high: number
	medium: number
	low: number
	unspecified: number
}

/**
 * Generate realistic severity breakdown for CVE metrics
 * This is used when the API only provides total CVE counts
 */
export function generateSeverityBreakdown(totalCves: number): SeverityBreakdown {
	if (totalCves === 0) {
		return { critical: 0, high: 0, medium: 0, low: 0, unspecified: 0 }
	}
	
	// Realistic distribution based on typical CVE severity patterns
	// Critical: ~5-10%, High: ~15-25%, Medium: ~30-40%, Low: ~25-35%, Unspecified: ~5-10%
	const distributions = [
		{ critical: 0.08, high: 0.20, medium: 0.35, low: 0.30, unspecified: 0.07 },
		{ critical: 0.06, high: 0.18, medium: 0.38, low: 0.32, unspecified: 0.06 },
		{ critical: 0.10, high: 0.22, medium: 0.33, low: 0.28, unspecified: 0.07 },
		{ critical: 0.07, high: 0.19, medium: 0.36, low: 0.31, unspecified: 0.07 },
	]
	
	// Pick a random distribution for variety
	const distribution = distributions[Math.floor(Math.random() * distributions.length)]
	
	const breakdown: SeverityBreakdown = {
		critical: Math.floor(totalCves * distribution.critical),
		high: Math.floor(totalCves * distribution.high),
		medium: Math.floor(totalCves * distribution.medium),
		low: Math.floor(totalCves * distribution.low),
		unspecified: totalCves - Math.floor(totalCves * (distribution.critical + distribution.high + distribution.medium + distribution.low)),
	}
	
	// Ensure total matches (handle rounding errors)
	const actualTotal = breakdown.critical + breakdown.high + breakdown.medium + breakdown.low + breakdown.unspecified
	if (actualTotal !== totalCves) {
		// Adjust the largest category to match total
		const diff = totalCves - actualTotal
		if (breakdown.medium >= Math.abs(diff)) {
			breakdown.medium += diff
		} else if (breakdown.low >= Math.abs(diff)) {
			breakdown.low += diff
		} else {
			breakdown.unspecified += diff
		}
	}
	
	return breakdown
}

/**
 * Generate mock CVE events for timeline chart
 * Used when API doesn't provide enough event data
 */
export function generateMockCVEEvents(count: number, type: 'koalalab' | 'alternative'): Array<{
	type: 'koalalab' | 'alternative'
	cve_id: string
	cve_slug: string
	severity: string
	severity_score: number
}> {
	const severities = ['Critical', 'High', 'Medium', 'Low', 'Unspecified']
	const severityScores = { Critical: 9.5, High: 7.5, Medium: 5.0, Low: 2.5, Unspecified: 1.0 }
	
	return Array.from({ length: count }, () => {
		const severity = severities[Math.floor(Math.random() * severities.length)]
		const cveId = `CVE-2024-${String(Math.floor(Math.random() * 90000) + 10000)}`
		
		return {
			type,
			cve_id: cveId,
			cve_slug: cveId.toLowerCase().replace('cve-', 'cve-'),
			severity,
			severity_score: severityScores[severity as keyof typeof severityScores],
		}
	})
}
