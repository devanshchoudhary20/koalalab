import { api } from './index'
import { USE_MOCK_DATA } from './config'
import type { MockApiClient } from './mock-client'
import type { ApiClient } from './client'
import type { VulnerabilityDetails, AdvisoryDetails } from '@/types/api'

export async function fetchVulnerabilityDetails(
	packageSlug: string,
	versionSlug: string,
	cveSlug: string
): Promise<VulnerabilityDetails> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getVulnerabilityDetails(packageSlug, versionSlug, cveSlug)
	}
	return (api as ApiClient).get<VulnerabilityDetails>(`/packages/${packageSlug}/versions/${versionSlug}/vulnerabilities/${cveSlug}`)
}

export async function fetchAdvisoryDetails(
	packageSlug: string,
	cveSlug: string
): Promise<AdvisoryDetails> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getAdvisoryDetails(packageSlug, cveSlug)
	}
	return (api as ApiClient).get<AdvisoryDetails>(`/packages/${packageSlug}/advisories/${cveSlug}`)
}
