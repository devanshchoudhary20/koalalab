import { useState, useEffect } from 'react'
import { fetchContainers, fetchContainer, fetchContainerTags } from '@/lib/api/containers'
import type { Container, ContainerListResponse, TagListResponse } from '@/types/api'
import type { ContainerParams, TagParams } from '@/lib/api/containers'

export function useContainers(params: ContainerParams = {}) {
	const [data, setData] = useState<ContainerListResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadContainers = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchContainers(params)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch containers')
			} finally {
				setLoading(false)
			}
		}

		loadContainers()
	}, [JSON.stringify(params)])

	return { data, loading, error, refetch: () => setData(null) }
}

export function useContainer(slug: string) {
	const [data, setData] = useState<Container | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug) return

		const loadContainer = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchContainer(slug)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch container')
			} finally {
				setLoading(false)
			}
		}

		loadContainer()
	}, [slug])

	return { data, loading, error, refetch: () => setData(null) }
}

export function useContainerTags(slug: string, params: TagParams = {}) {
	const [data, setData] = useState<TagListResponse | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!slug) return

		const loadTags = async () => {
			setLoading(true)
			setError(null)
			
			try {
				const result = await fetchContainerTags(slug, params)
				setData(result)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch container tags')
			} finally {
				setLoading(false)
			}
		}

		loadTags()
	}, [slug, JSON.stringify(params)])

	return { data, loading, error, refetch: () => setData(null) }
}
