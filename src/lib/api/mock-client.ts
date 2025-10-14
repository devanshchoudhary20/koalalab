import type {
	ContainerListResponse,
	Container,
	TagListResponse,
	PackageListResponse,
	VulnerabilityListResponse,
	AdvisoryListResponse,
	ComparisonData,
	VulnerabilityDetails,
	AdvisoryDetails,
} from '@/types/api'
import { generateMockContainers } from '@/data/mock/containers'
import { generateTagsForContainer } from '@/data/mock/tags'
import { generateVulnerabilitiesForTag } from '@/data/mock/vulnerabilities'
import { generatePackagesForTag } from '@/data/mock/packages'
import { generateAdvisoriesForContainer } from '@/data/mock/advisories'
import { getComparisonData } from '@/data/mock/comparison'
import { paginateResults, filterBySearch, simulateDelay } from '@/data/mock/helpers'

export class MockApiClient {
	async getContainers(params: { search?: string; tags?: string; page?: number } = {}): Promise<ContainerListResponse> {
		await simulateDelay()
		
		let containers = generateMockContainers()
		
		// Filter by search term
		if (params.search) {
			containers = filterBySearch(containers, params.search, ['name', 'description', 'usage'])
		}
		
		// Filter by tags
		if (params.tags) {
			containers = containers.filter(container => 
				container.tags?.some(tag => tag.toLowerCase().includes(params.tags!.toLowerCase()))
			)
		}
		
		return paginateResults(containers, params.page || 1, 15)
	}

	async getContainer(slug: string): Promise<Container> {
		await simulateDelay()
		
		const containers = generateMockContainers()
		const container = containers.find(c => c.slug === slug)
		
		if (!container) {
			throw new Error(`Container with slug '${slug}' not found`)
		}
		
		return container
	}

	async getContainerTags(
		slug: string,
		params: { variant?: string; search?: string; page?: number } = {}
	): Promise<TagListResponse> {
		await simulateDelay()
		
		let tags = generateTagsForContainer(slug)
		
		// Filter by variant
		if (params.variant && params.variant !== 'all') {
			tags = tags.filter(tag => tag.variant === params.variant)
		}
		
		// Filter by search term
		if (params.search) {
			tags = filterBySearch(tags, params.search, ['tag_name'])
		}
		
		return {
			available_variants: ['all', 'builder', 'production'],
			...paginateResults(tags, params.page || 1, 20)
		}
	}

	async getTagPackages(
		slug: string,
		tagSlug: string,
		params: { arch?: string; search?: string; page?: number } = {}
	): Promise<PackageListResponse> {
		await simulateDelay()
		
		const { packages, tag_metadata } = generatePackagesForTag(slug, tagSlug)
		
		let filteredPackages = packages
		
		// Filter by search term
		if (params.search) {
			filteredPackages = filterBySearch(packages, params.search, ['package', 'version', 'repository', 'license'])
		}
		
		return {
			tag_metadata,
			...paginateResults(filteredPackages, params.page || 1, 50)
		}
	}

	async getTagVulnerabilities(
		slug: string,
		tagSlug: string,
		params: { arch?: string; severity?: string; search?: string; page?: number } = {}
	): Promise<VulnerabilityListResponse> {
		await simulateDelay()
		
		const { vulnerabilities, tag_metadata } = generateVulnerabilitiesForTag(slug, tagSlug)
		
		let filteredVulnerabilities = vulnerabilities
		
		// Filter by severity
		if (params.severity) {
			filteredVulnerabilities = vulnerabilities.filter(v => v.severity === params.severity)
		}
		
		// Filter by search term
		if (params.search) {
			filteredVulnerabilities = filterBySearch(vulnerabilities, params.search, ['cve_id', 'package', 'version'])
		}
		
		return {
			tag_metadata,
			...paginateResults(filteredVulnerabilities, params.page || 1, 20)
		}
	}

	async getContainerAdvisories(
		slug: string,
		params: { search?: string; status?: string; page?: number } = {}
	): Promise<AdvisoryListResponse> {
		await simulateDelay()
		
		let advisories = generateAdvisoriesForContainer()
		
		// Filter by status
		if (params.status) {
			advisories = advisories.filter(advisory => advisory.status === params.status)
		}
		
		// Filter by search term
		if (params.search) {
			advisories = filterBySearch(advisories, params.search, ['cve_id', 'package'])
		}
		
		return paginateResults(advisories, params.page || 1, 20)
	}

	async getTagComparison(
		slug: string,
		tagSlug: string,
		params: { alternative?: string; period?: string; critical_high_only?: boolean } = {}
	): Promise<ComparisonData> {
		await simulateDelay()
		
		return getComparisonData(
			slug,
			tagSlug,
			params.alternative,
			params.period,
			params.critical_high_only
		)
	}

	async getVulnerabilityDetails(
		packageSlug: string,
		versionSlug: string,
		cveSlug: string
	): Promise<VulnerabilityDetails> {
		await simulateDelay()
		
		return {
			cve_id: cveSlug.toUpperCase(),
			cve_slug: cveSlug,
			description: `This is a mock vulnerability description for ${cveSlug}. It affects ${packageSlug} version ${versionSlug} and could potentially allow attackers to execute arbitrary code or cause a denial of service.`,
			references: [
				`https://cve.mitre.org/cgi-bin/cvename.cgi?name=${cveSlug.toUpperCase()}`,
				`https://nvd.nist.gov/vuln/detail/${cveSlug.toUpperCase()}`,
				`https://security-tracker.debian.org/tracker/${cveSlug.toUpperCase()}`,
			],
		}
	}

	async getAdvisoryDetails(
		packageSlug: string,
		cveSlug: string
	): Promise<AdvisoryDetails> {
		await simulateDelay()
		
		return {
			cve_id: cveSlug.toUpperCase(),
			cve_slug: cveSlug,
			package: packageSlug,
			package_slug: packageSlug,
			current_status: 'Under Investigation',
			date_detected: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
			description: `Security advisory for ${packageSlug} regarding ${cveSlug.toUpperCase()}. This vulnerability has been identified and is currently under investigation by our security team.`,
			references: [
				`https://security-advisories.koalalab.com/${cveSlug}`,
				`https://github.com/koalalab/security-advisories/issues/${cveSlug}`,
			],
			advisory_changes: [
				{
					date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
					status: 'Under Investigation',
					fixed_version: null,
					impact: 'High',
					clarification: 'Initial detection and assessment',
				},
			],
		}
	}
}

export const mockApiClient = new MockApiClient()
