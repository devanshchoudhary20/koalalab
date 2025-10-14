// Helper functions for mock data generation

export function generateSlug(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

export function paginateResults<T>(
	items: T[],
	page: number = 1,
	perPage: number = 20
): { results: T[]; pagination: { page: number; per_page: number; total_results: number; total_pages: number } } {
	const startIndex = (page - 1) * perPage
	const endIndex = startIndex + perPage
	const results = items.slice(startIndex, endIndex)
	const totalPages = Math.ceil(items.length / perPage)

	return {
		results,
		pagination: {
			page,
			per_page: perPage,
			total_results: items.length,
			total_pages: totalPages,
		},
	}
}

export function filterBySearch<T>(
	items: T[],
	searchTerm: string,
	fields: (keyof T)[]
): T[] {
	if (!searchTerm) return items

	const term = searchTerm.toLowerCase()
	return items.filter((item) =>
		fields.some((field) => {
			const value = item[field]
			return typeof value === 'string' && value.toLowerCase().includes(term)
		})
	)
}

export function simulateDelay(ms: number = 300): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
