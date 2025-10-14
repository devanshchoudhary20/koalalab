import { api } from './index'
import type { VulnerabilityDetails, AdvisoryDetails } from '@/types/api'

export async function fetchVulnerabilityDetails(
	packageSlug: string,
	versionSlug: string,
	cveSlug: string
): Promise<VulnerabilityDetails> {
	return api.getVulnerabilityDetails(packageSlug, versionSlug, cveSlug)
}

export async function fetchAdvisoryDetails(
	packageSlug: string,
	cveSlug: string
): Promise<AdvisoryDetails> {
	return api.getAdvisoryDetails(packageSlug, cveSlug)
}
