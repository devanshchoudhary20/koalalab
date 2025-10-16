import { api } from './index'
import { USE_MOCK_DATA } from './config'
import type { MockApiClient } from './mock-client'
import type { ApiClient } from './client'
import type {
	ContainerListResponse,
	Container,
	TagListResponse,
	PackageListResponse,
	VulnerabilityListResponse,
	AdvisoryListResponse,
	ComparisonData,
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
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getContainers(params)
	}
	return (api as ApiClient).get<ContainerListResponse>('/containers', params as Record<string, string | number | boolean>)
}

export async function fetchContainer(slug: string): Promise<Container> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getContainer(slug)
	}
	return (api as ApiClient).get<Container>(`/containers/${slug}`)
}

export async function fetchContainerTags(
	slug: string,
	params: TagParams = {}
): Promise<TagListResponse> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getContainerTags(slug, params)
	}
	return (api as ApiClient).get<TagListResponse>(`/containers/${slug}/tags`, params as Record<string, string | number | boolean>)
}

export async function fetchTagPackages(
	slug: string,
	tagSlug: string,
	params: PackageParams = {}
): Promise<PackageListResponse> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getTagPackages(slug, tagSlug, params)
	}
	return (api as ApiClient).get<PackageListResponse>(`/containers/${slug}/tags/${tagSlug}/packages`, params as Record<string, string | number | boolean>)
}

export async function fetchTagVulnerabilities(
	slug: string,
	tagSlug: string,
	params: VulnerabilityParams = {}
): Promise<VulnerabilityListResponse> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getTagVulnerabilities(slug, tagSlug, params)
	}
	return (api as ApiClient).get<VulnerabilityListResponse>(`/containers/${slug}/tags/${tagSlug}/vulnerabilities`, params as Record<string, string | number | boolean>)
}

export async function fetchContainerAdvisories(
	slug: string,
	params: AdvisoryParams = {}
): Promise<AdvisoryListResponse> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getContainerAdvisories(slug, params)
	}
	return (api as ApiClient).get<AdvisoryListResponse>(`/containers/${slug}/advisories`, params as Record<string, string | number | boolean>)
}

export async function fetchTagComparison(
	slug: string,
	tagSlug: string,
	params: ComparisonParams = {}
): Promise<ComparisonData> {
	if (USE_MOCK_DATA) {
		return (api as MockApiClient).getTagComparison(slug, tagSlug, params)
	}
	return (api as ApiClient).get<ComparisonData>(`/containers/${slug}/tags/${tagSlug}/comparison`, params as Record<string, string | number | boolean>)
}
