import { API_BASE_URL } from './config'
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

export interface ApiError {
	error: string
	message: string
	status: number
}

export class ApiClient {
	private baseUrl: string

	constructor(baseUrl: string = API_BASE_URL) {
		this.baseUrl = baseUrl
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {}
	): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`
		
		try {
			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
					...options.headers,
				},
				...options,
			})

			if (!response.ok) {
				const errorData: ApiError = await response.json()
				throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
			}

			return await response.json()
		} catch (error) {
			if (error instanceof Error) {
				throw error
			}
			throw new Error('An unexpected error occurred')
		}
	}

	async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
		const searchParams = new URLSearchParams()
		
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					searchParams.append(key, String(value))
				}
			})
		}

		const queryString = searchParams.toString()
		const url = queryString ? `${endpoint}?${queryString}` : endpoint

		return this.request<T>(url, { method: 'GET' })
	}

	async post<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'POST',
			body: data ? JSON.stringify(data) : undefined,
		})
	}

	async put<T>(endpoint: string, data?: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: 'PUT',
			body: data ? JSON.stringify(data) : undefined,
		})
	}

	async delete<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, { method: 'DELETE' })
	}

	// Container methods
	async getContainers(params: { search?: string; tags?: string; page?: number } = {}): Promise<ContainerListResponse> {
		return this.get<ContainerListResponse>('/containers', params)
	}

	async getContainer(slug: string): Promise<Container> {
		return this.get<Container>(`/containers/${slug}`)
	}

	async getContainerTags(
		slug: string,
		params: { variant?: string; search?: string; page?: number } = {}
	): Promise<TagListResponse> {
		return this.get<TagListResponse>(`/containers/${slug}/tags`, params)
	}

	async getTagPackages(
		slug: string,
		tagSlug: string,
		params: { arch?: string; search?: string; page?: number } = {}
	): Promise<PackageListResponse> {
		return this.get<PackageListResponse>(`/containers/${slug}/tags/${tagSlug}/packages`, params)
	}

	async getTagVulnerabilities(
		slug: string,
		tagSlug: string,
		params: { arch?: string; severity?: string; search?: string; page?: number } = {}
	): Promise<VulnerabilityListResponse> {
		return this.get<VulnerabilityListResponse>(`/containers/${slug}/tags/${tagSlug}/vulnerabilities`, params)
	}

	async getContainerAdvisories(
		slug: string,
		params: { search?: string; status?: string; page?: number } = {}
	): Promise<AdvisoryListResponse> {
		return this.get<AdvisoryListResponse>(`/containers/${slug}/advisories`, params)
	}

	async getTagComparison(
		slug: string,
		tagSlug: string,
		params: { alternative?: string; period?: string; critical_high_only?: boolean } = {}
	): Promise<ComparisonData> {
		return this.get<ComparisonData>(`/containers/${slug}/tags/${tagSlug}/comparison`, params)
	}

	async getVulnerabilityDetails(
		packageSlug: string,
		versionSlug: string,
		cveSlug: string
	): Promise<VulnerabilityDetails> {
		return this.get<VulnerabilityDetails>(`/packages/${packageSlug}/versions/${versionSlug}/vulnerabilities/${cveSlug}`)
	}

	async getAdvisoryDetails(
		packageSlug: string,
		cveSlug: string
	): Promise<AdvisoryDetails> {
		return this.get<AdvisoryDetails>(`/packages/${packageSlug}/advisories/${cveSlug}`)
	}
}

export const apiClient = new ApiClient()
