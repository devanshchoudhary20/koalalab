import type { Advisory } from '@/types/api'
import { generateSlug } from './helpers'

const baseCVEs = [
	'CVE-2024-58251',
	'CVE-2024-58252',
	'CVE-2024-45490',
	'CVE-2024-45491',
	'CVE-2023-52425',
	'CVE-2023-52426',
	'CVE-2024-1234',
	'CVE-2024-5678',
	'CVE-2023-9876',
	'CVE-2023-5432',
]

const basePackages = [
	'busybox',
	'openssl',
	'zlib',
	'libcrypto3',
	'libssl3',
	'musl',
	'apk-tools',
	'ca-certificates',
	'libxml2',
	'curl',
]

const statuses = [
	'Under Investigation',
	'Pending Upstream Fix',
	'Fixed',
	'Not Affected',
	'Fix Not Planned',
]

export function generateAdvisoriesForContainer(_containerSlug: string): Advisory[] {
	const advisories: Advisory[] = []

	// Generate 15-25 advisories
	const advisoryCount = 20

	for (let i = 0; i < advisoryCount; i++) {
		const cve = baseCVEs[i % baseCVEs.length]
		const cveVariation = i < baseCVEs.length ? '' : `-${Math.floor(i / baseCVEs.length)}`
		const cveId = `${cve}${cveVariation}`

		const packageName = basePackages[i % basePackages.length]
		const status = statuses[i % statuses.length]

		advisories.push({
			date_detected: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
			cve_id: cveId,
			cve_slug: generateSlug(cveId),
			package: packageName,
			package_slug: generateSlug(packageName),
			status: status as 'Under Investigation' | 'Pending Upstream Fix' | 'Fixed' | 'Not Affected' | 'Fix Not Planned',
			advisory_details_url: `/api/v1/packages/${generateSlug(packageName)}/advisories/${generateSlug(cveId)}`,
		})
	}

	// Sort by date_detected descending (newest first)
	advisories.sort((a, b) => new Date(b.date_detected).getTime() - new Date(a.date_detected).getTime())

	return advisories
}
