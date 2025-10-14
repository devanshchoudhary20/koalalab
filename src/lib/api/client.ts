const API_BASE_URL = 'http://localhost:3000/api/v1'

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
}

export const apiClient = new ApiClient()
