import { useState, useEffect } from 'react'
import { fetchTagVulnerabilities } from '@/lib/api/containers'
import type { VulnerabilityListResponse } from '@/types/api'
import type { VulnerabilityParams } from '@/lib/api/containers'

export function useVulnerabilities(
	slug: string,
	tagSlug: string,
	params: VulnerabilityParams = {}
) {
	const [data, setData] = useState<VulnerabilityListResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug || !tagSlug) return

		const loadVulnerabilities = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchTagVulnerabilities(slug, tagSlug, params)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch vulnerabilities')
			} finally {
				setLoading(false)
			}
		}

		loadVulnerabilities()
	}, [slug, tagSlug, params])

	return { data, loading, error, refetch: () => setData(null) }
}
