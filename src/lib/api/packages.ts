import { api } from './index'
import type { ApiClient } from './client'
import type { VulnerabilityDetails, AdvisoryDetails } from '@/types/api'

export async function fetchVulnerabilityDetails(
	packageSlug: string,
	versionSlug: string,
	cveSlug: string
): Promise<VulnerabilityDetails> {
	return (api as ApiClient).get<VulnerabilityDetails>(`/packages/${packageSlug}/versions/${versionSlug}/vulnerabilities/${cveSlug}`)
}

export async function fetchAdvisoryDetails(
	packageSlug: string,
	cveSlug: string
): Promise<AdvisoryDetails> {
	return (api as ApiClient).get<AdvisoryDetails>(`/packages/${packageSlug}/advisories/${cveSlug}`)
}
