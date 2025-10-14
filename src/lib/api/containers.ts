import { api } from './index'
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
	return api.getContainers(params)
}

export async function fetchContainer(slug: string): Promise<Container> {
	return api.getContainer(slug)
}

export async function fetchContainerTags(
	slug: string,
	params: TagParams = {}
): Promise<TagListResponse> {
	return api.getContainerTags(slug, params)
}

export async function fetchTagPackages(
	slug: string,
	tagSlug: string,
	params: PackageParams = {}
): Promise<PackageListResponse> {
	return api.getTagPackages(slug, tagSlug, params)
}

export async function fetchTagVulnerabilities(
	slug: string,
	tagSlug: string,
	params: VulnerabilityParams = {}
): Promise<VulnerabilityListResponse> {
	return api.getTagVulnerabilities(slug, tagSlug, params)
}

export async function fetchContainerAdvisories(
	slug: string,
	params: AdvisoryParams = {}
): Promise<AdvisoryListResponse> {
	return api.getContainerAdvisories(slug, params)
}

export async function fetchTagComparison(
	slug: string,
	tagSlug: string,
	params: ComparisonParams = {}
): Promise<ComparisonData> {
	return api.getTagComparison(slug, tagSlug, params)
}
