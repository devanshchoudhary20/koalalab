// Date formatting
export function formatDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
	})
}

export function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString)
	const now = new Date()
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

	if (diffInSeconds < 60) {
		return 'Just now'
	}

	const diffInMinutes = Math.floor(diffInSeconds / 60)
	if (diffInMinutes < 60) {
		return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
	}

	const diffInHours = Math.floor(diffInMinutes / 60)
	if (diffInHours < 24) {
		return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
	}

	const diffInDays = Math.floor(diffInHours / 24)
	if (diffInDays < 7) {
		return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
	}

	const diffInWeeks = Math.floor(diffInDays / 7)
	if (diffInWeeks < 4) {
		return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`
	}

	return formatDate(dateString)
}

// Size formatting
export function formatSize(sizeInMB: number): string {
	if (sizeInMB < 1) {
		return `${Math.round(sizeInMB * 1024)} KB`
	}
	return `${sizeInMB.toFixed(1)} MB`
}

// Severity color mapping
export function getSeverityColor(severity: string): string {
	switch (severity.toLowerCase()) {
		case 'critical':
			return 'bg-severity-critical text-white border-severity-critical'
		case 'high':
			return 'bg-severity-high text-white border-severity-high'
		case 'medium':
			return 'bg-severity-medium text-white border-severity-medium'
		case 'low':
			return 'bg-severity-low text-white border-severity-low'
		case 'unspecified':
			return 'bg-severity-negligible text-white border-severity-negligible'
		default:
			return 'bg-severity-negligible text-white border-severity-negligible'
	}
}

// Status badge color mapping
export function getStatusColor(status: string): string {
	switch (status) {
		case 'Fixed':
			return 'bg-green-100 text-green-800 border-green-200'
		case 'Under Investigation':
			return 'bg-orange-100 text-orange-800 border-orange-200'
		case 'Pending Upstream Fix':
			return 'bg-yellow-100 text-yellow-800 border-yellow-200'
		case 'Not Affected':
			return 'bg-gray-100 text-gray-800 border-gray-200'
		case 'Fix Not Planned':
			return 'bg-red-100 text-red-800 border-red-200'
		default:
			return 'bg-gray-100 text-gray-600 border-gray-200'
	}
}

// CVSS score color mapping
export function getCVSSColor(score: number): string {
	if (score >= 9.0) {
		return 'text-severity-critical'
	} else if (score >= 7.0) {
		return 'text-severity-high'
	} else if (score >= 4.0) {
		return 'text-severity-medium'
	} else if (score > 0) {
		return 'text-severity-low'
	}
	return 'text-severity-negligible'
}

// Format CVSS score
export function formatCVSSScore(score: number): string {
	return score > 0 ? score.toFixed(1) : 'N/A'
}

// Format vulnerability count for display
export function formatVulnerabilityCount(count: number): string {
	if (count === 0) return '0'
	if (count < 1000) return count.toString()
	return `${(count / 1000).toFixed(1)}k`
}

// Format percentage
export function formatPercentage(value: number): string {
	return `${Math.round(value)}%`
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text
	return `${text.substring(0, maxLength)}...`
}

// Format architecture display
export function formatArchitecture(architectures: string[]): string {
	return architectures.join(' + ')
}

// Format tag name for display
export function formatTagName(tagName: string): string {
	// Handle comma-separated tag names
	if (tagName.includes(',')) {
		const tags = tagName.split(',').map(tag => tag.trim())
		return tags.length > 2 
			? `${tags[0]}, ${tags[1]}...` 
			: tagName
	}
	return tagName
}
