import { useState, useEffect } from 'react'
import { fetchContainerAdvisories } from '@/lib/api/containers'
import type { AdvisoryListResponse } from '@/types/api'
import type { AdvisoryParams } from '@/lib/api/containers'

export function useAdvisories(
	slug: string,
	params: AdvisoryParams = {}
) {
	const [data, setData] = useState<AdvisoryListResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug) return

		const loadAdvisories = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchContainerAdvisories(slug, params)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch advisories')
			} finally {
				setLoading(false)
			}
		}

		loadAdvisories()
	}, [slug, params])

	return { data, loading, error, refetch: () => setData(null) }
}
