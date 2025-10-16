import { api } from './index'
import type { ApiClient } from './client'
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

export interface ContainerParams {
	search?: string
	tags?: string
	page?: number
}

export interface TagParams {
	variant?: string
	search?: string
	page?: number
}

export interface PackageParams {
	arch?: string
	search?: string
	page?: number
}

export interface VulnerabilityParams {
	arch?: string
	severity?: string
	search?: string
	page?: number
}

export interface AdvisoryParams {
	search?: string
	status?: string
	page?: number
}

export interface ComparisonParams {
	alternative?: string
	period?: string
	critical_high_only?: boolean
}

// Container endpoints
export async function fetchContainers(params: ContainerParams = {}): Promise<ContainerListResponse> {
	return (api as ApiClient).get<ContainerListResponse>('/containers', params as Record<string, string | number | boolean>)
}

export async function fetchContainer(slug: string): Promise<Container> {
	return (api as ApiClient).get<Container>(`/containers/${slug}`)
}

export async function fetchContainerTags(
	slug: string,
	params: TagParams = {}
): Promise<TagListResponse> {
	return (api as ApiClient).get<TagListResponse>(`/containers/${slug}/tags`, params as Record<string, string | number | boolean>)
}

export async function fetchTagPackages(
	slug: string,
	tagSlug: string,
	params: PackageParams = {}
): Promise<PackageListResponse> {
	return (api as ApiClient).get<PackageListResponse>(`/containers/${slug}/tags/${tagSlug}/packages`, params as Record<string, string | number | boolean>)
}

export async function fetchTagVulnerabilities(
	slug: string,
	tagSlug: string,
	params: VulnerabilityParams = {}
): Promise<VulnerabilityListResponse> {
	return (api as ApiClient).get<VulnerabilityListResponse>(`/containers/${slug}/tags/${tagSlug}/vulnerabilities`, params as Record<string, string | number | boolean>)
}

export async function fetchContainerAdvisories(
	slug: string,
	params: AdvisoryParams = {}
): Promise<AdvisoryListResponse> {
	return (api as ApiClient).get<AdvisoryListResponse>(`/containers/${slug}/advisories`, params as Record<string, string | number | boolean>)
}

export async function fetchTagComparison(
	slug: string,
	tagSlug: string,
	params: ComparisonParams = {}
): Promise<ComparisonData> {
	return (api as ApiClient).get<ComparisonData>(`/containers/${slug}/tags/${tagSlug}/comparison`, params as Record<string, string | number | boolean>)
}

// Vulnerability details endpoint
export async function fetchVulnerabilityDetails(
	packageSlug: string,
	versionSlug: string,
	cveSlug: string
): Promise<VulnerabilityDetails> {
	return (api as ApiClient).get<VulnerabilityDetails>(`/packages/${packageSlug}/versions/${versionSlug}/vulnerabilities/${cveSlug}`)
}

// Advisory details endpoint
export async function fetchAdvisoryDetails(
	packageSlug: string,
	cveSlug: string
): Promise<AdvisoryDetails> {
	return (api as ApiClient).get<AdvisoryDetails>(`/packages/${packageSlug}/advisories/${cveSlug}`)
}
