import { useState, useEffect } from 'react'
import { fetchTagComparison } from '@/lib/api/containers'
import type { ComparisonData } from '@/types/api'
import type { ComparisonParams } from '@/lib/api/containers'

export function useComparison(
	slug: string,
	tagSlug: string,
	params: ComparisonParams = {}
) {
	const [data, setData] = useState<ComparisonData | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug || !tagSlug) return

		const loadComparison = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchTagComparison(slug, tagSlug, params)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch comparison data')
			} finally {
				setLoading(false)
			}
		}

		loadComparison()
	}, [slug, tagSlug, params.alternative, params.period, params.critical_high_only])

	return { data, loading, error, refetch: () => setData(null) }
}
