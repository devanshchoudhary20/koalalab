import type { Tag } from '@/types/api'

export function generateTagsForContainer(containerSlug: string): Tag[] {
	const baseTags: Tag[] = [
		{
			tag_name: 'latest',
			url: 'latest',
			vulnerabilities: {
				critical: 0,
				high: 2,
				medium: 5,
				low: 23,
				negligible: 1,
			},
			size: {
				total_mb: 45.2,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-15T13:00:00Z',
		},
		{
			tag_name: '3.10-dev, 3.10.18-dev',
			url: '3.10-dev, 3.10.18-dev',
			vulnerabilities: {
				critical: 0,
				high: 8,
				medium: 4,
				low: 141,
				negligible: 2,
			},
			size: {
				total_mb: 22.38,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-14T15:30:00Z',
		},
		{
			tag_name: '3.9-dev, 3.9.18-dev',
			url: '3.9-dev, 3.9.18-dev',
			vulnerabilities: {
				critical: 1,
				high: 12,
				medium: 8,
				low: 156,
				negligible: 3,
			},
			size: {
				total_mb: 28.45,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-13T12:15:00Z',
		},
		{
			tag_name: '3.8-dev, 3.8.18-dev',
			url: '3.8-dev, 3.8.18-dev',
			vulnerabilities: {
				critical: 0,
				high: 6,
				medium: 12,
				low: 134,
				negligible: 1,
			},
			size: {
				total_mb: 25.67,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-12T09:45:00Z',
		},
		{
			tag_name: '3.7-dev, 3.7.18-dev',
			url: '3.7-dev, 3.7.18-dev',
			vulnerabilities: {
				critical: 2,
				high: 15,
				medium: 9,
				low: 178,
				negligible: 4,
			},
			size: {
				total_mb: 31.23,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-11T14:20:00Z',
		},
		{
			tag_name: 'builder',
			url: 'builder',
			vulnerabilities: {
				critical: 0,
				high: 3,
				medium: 7,
				low: 45,
				negligible: 1,
			},
			size: {
				total_mb: 78.9,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'builder',
			last_changed: '2025-01-10T16:30:00Z',
		},
		{
			tag_name: 'production',
			url: 'production',
			vulnerabilities: {
				critical: 0,
				high: 1,
				medium: 3,
				low: 18,
				negligible: 0,
			},
			size: {
				total_mb: 12.5,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'production',
			last_changed: '2025-01-09T11:15:00Z',
		},
		{
			tag_name: '3.6-dev, 3.6.18-dev',
			url: '3.6-dev, 3.6.18-dev',
			vulnerabilities: {
				critical: 1,
				high: 9,
				medium: 6,
				low: 98,
				negligible: 2,
			},
			size: {
				total_mb: 27.8,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-08T13:45:00Z',
		},
		{
			tag_name: '3.5-dev, 3.5.18-dev',
			url: '3.5-dev, 3.5.18-dev',
			vulnerabilities: {
				critical: 0,
				high: 7,
				medium: 11,
				low: 112,
				negligible: 1,
			},
			size: {
				total_mb: 24.1,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-07T10:30:00Z',
		},
		{
			tag_name: '3.4-dev, 3.4.18-dev',
			url: '3.4-dev, 3.4.18-dev',
			vulnerabilities: {
				critical: 3,
				high: 18,
				medium: 14,
				low: 203,
				negligible: 5,
			},
			size: {
				total_mb: 35.6,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-06T15:20:00Z',
		},
		{
			tag_name: '3.3-dev, 3.3.18-dev',
			url: '3.3-dev, 3.3.18-dev',
			vulnerabilities: {
				critical: 0,
				high: 5,
				medium: 8,
				low: 87,
				negligible: 1,
			},
			size: {
				total_mb: 26.3,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-05T08:15:00Z',
		},
		{
			tag_name: '3.2-dev, 3.2.18-dev',
			url: '3.2-dev, 3.2.18-dev',
			vulnerabilities: {
				critical: 2,
				high: 11,
				medium: 9,
				low: 145,
				negligible: 3,
			},
			size: {
				total_mb: 29.7,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-04T12:45:00Z',
		},
		{
			tag_name: '3.1-dev, 3.1.18-dev',
			url: '3.1-dev, 3.1.18-dev',
			vulnerabilities: {
				critical: 1,
				high: 13,
				medium: 7,
				low: 167,
				negligible: 2,
			},
			size: {
				total_mb: 32.1,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-03T14:30:00Z',
		},
		{
			tag_name: '3.0-dev, 3.0.18-dev',
			url: '3.0-dev, 3.0.18-dev',
			vulnerabilities: {
				critical: 4,
				high: 22,
				medium: 16,
				low: 234,
				negligible: 6,
			},
			size: {
				total_mb: 38.9,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-02T16:20:00Z',
		},
		{
			tag_name: '2.9-dev, 2.9.18-dev',
			url: '2.9-dev, 2.9.18-dev',
			vulnerabilities: {
				critical: 0,
				high: 4,
				medium: 5,
				low: 67,
				negligible: 1,
			},
			size: {
				total_mb: 21.4,
				architectures: ['x86_64', 'arm64'],
			},
			variant: 'all',
			last_changed: '2025-01-01T09:10:00Z',
		},
	]

	// Generate additional tags based on container type
	const additionalTags: Tag[] = []
	
	if (containerSlug === 'python-base') {
		for (let i = 0; i < 20; i++) {
			const major = 3 + (i % 3)
			const minor = 8 + (i % 5)
			const patch = i % 20
			additionalTags.push({
				tag_name: `${major}.${minor}.${patch}`,
				url: `${major}.${minor}.${patch}`,
				vulnerabilities: {
					critical: Math.floor(Math.random() * 3),
					high: Math.floor(Math.random() * 15) + 5,
					medium: Math.floor(Math.random() * 10) + 2,
					low: Math.floor(Math.random() * 200) + 100,
					negligible: Math.floor(Math.random() * 5),
				},
				size: {
					total_mb: parseFloat((20 + Math.random() * 30).toFixed(2)),
					architectures: ['x86_64', 'arm64'],
				},
				variant: ['all', 'builder', 'production'][i % 3],
				last_changed: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
			})
		}
	}

	return [...baseTags, ...additionalTags].sort((a, b) => 
		new Date(b.last_changed).getTime() - new Date(a.last_changed).getTime()
	)
}
