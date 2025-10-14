import type { Vulnerability, TagMetadata } from '@/types/api'
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
	{ name: 'busybox', version: '1.37.0-r49', fixedVersion: '1.37.0-r50' },
	{ name: 'openssl', version: '3.1.4-r0', fixedVersion: null },
	{ name: 'zlib', version: '1.3-r1', fixedVersion: '1.3-r2' },
	{ name: 'libcrypto3', version: '3.1.4-r0', fixedVersion: '3.1.5-r0' },
	{ name: 'libssl3', version: '3.1.4-r0', fixedVersion: '3.1.5-r0' },
	{ name: 'musl', version: '1.2.4-r2', fixedVersion: '1.2.4-r3' },
	{ name: 'apk-tools', version: '2.14.0-r2', fixedVersion: null },
	{ name: 'ca-certificates', version: '20230506-r0', fixedVersion: '20230506-r1' },
	{ name: 'libxml2', version: '2.11.4-r0', fixedVersion: '2.11.5-r0' },
	{ name: 'curl', version: '8.2.1-r0', fixedVersion: '8.2.1-r1' },
]

const severityLevels = [
	{ severity: 'Critical', minScore: 9.0, maxScore: 10.0 },
	{ severity: 'High', minScore: 7.0, maxScore: 8.9 },
	{ severity: 'Medium', minScore: 4.0, maxScore: 6.9 },
	{ severity: 'Low', minScore: 0.1, maxScore: 3.9 },
	{ severity: 'Unspecified', minScore: 0.0, maxScore: 0.0 },
]

export function generateVulnerabilitiesForTag(
	containerSlug: string,
	tagSlug: string
): { vulnerabilities: Vulnerability[]; tag_metadata: TagMetadata } {
	const vulnerabilities: Vulnerability[] = []

	// Generate 50 vulnerabilities
	for (let i = 0; i < 50; i++) {
		const cve = baseCVEs[i % baseCVEs.length]
		const cveVariation = i < baseCVEs.length ? '' : `-${Math.floor(i / baseCVEs.length)}`
		const cveId = `${cve}${cveVariation}`

		const packageInfo = basePackages[i % basePackages.length]
		const severityInfo = severityLevels[i % severityLevels.length]

		const severityScore = severityInfo.severity === 'Unspecified'
			? 0.0
			: severityInfo.minScore + Math.random() * (severityInfo.maxScore - severityInfo.minScore)

		vulnerabilities.push({
			cve_id: cveId,
			cve_slug: generateSlug(cveId),
			severity: severityInfo.severity as 'Critical' | 'High' | 'Medium' | 'Low' | 'Unspecified',
			severity_score: parseFloat(severityScore.toFixed(1)),
			package: packageInfo.name,
			package_slug: generateSlug(packageInfo.name),
			version: packageInfo.version,
			version_slug: generateSlug(packageInfo.version),
			fixed_in_version: packageInfo.fixedVersion,
			last_detected: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
		})
	}

	// Sort by severity (Critical first) then by score
	vulnerabilities.sort((a, b) => {
		const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3, Unspecified: 4 }
		const aOrder = severityOrder[a.severity]
		const bOrder = severityOrder[b.severity]
		
		if (aOrder !== bOrder) return aOrder - bOrder
		return b.severity_score - a.severity_score
	})

	const tag_metadata: TagMetadata = {
		tag_name: tagSlug,
		tag_slug: generateSlug(tagSlug),
		last_changed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
		docker_pull_command: `docker pull kla.dev/KoalaLab/${containerSlug}:${tagSlug}`,
		architectures: [
			{ name: 'x86_64', arch_slug: 'x86_64', size_mb: 45.2 },
			{ name: 'arm64', arch_slug: 'arm64', size_mb: 42.8 },
		],
		sbom_download_url: `/api/v1/containers/${containerSlug}/tags/${tagSlug}/sbom`,
	}

	return { vulnerabilities, tag_metadata }
}
