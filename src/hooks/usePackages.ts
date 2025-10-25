import { useState, useEffect } from 'react'
import { fetchTagPackages } from '@/lib/api/containers'
import type { PackageListResponse } from '@/types/api'
import type { PackageParams } from '@/lib/api/containers'

export function usePackages(
	slug: string,
	tagSlug: string,
	params: PackageParams = {}
) {
	const [data, setData] = useState<PackageListResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug || !tagSlug) return

		const loadPackages = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchTagPackages(slug, tagSlug, params)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch packages')
			} finally {
				setLoading(false)
			}
		}

		loadPackages()
	}, [slug, tagSlug, JSON.stringify(params)])

	return { data, loading, error, refetch: () => setData(null) }
}
