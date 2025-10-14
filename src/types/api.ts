// Base types
export interface Pagination {
	page: number
	per_page: number
	total_results: number
	total_pages: number
}

// Container types
export interface Container {
	slug: string
	name: string
	logo_url: string
	description: string
	usage: string
	fips_available: boolean
	last_changed: string
	latest_tag: string
	additional_tags_count: number
	details_api_url: string
	tags?: string[]
}

export interface ContainerListResponse {
	results: Container[]
	pagination: Pagination
}

// Tag types
export interface Tag {
	tag_name: string
	url: string
	vulnerabilities: {
		critical: number
		high: number
		medium: number
		low: number
		negligible: number
	}
	size: {
		total_mb: number
		architectures: string[]
	}
	variant: string
	last_changed: string
}

export interface TagListResponse {
	available_variants: string[]
	results: Tag[]
	pagination: Pagination
}

// Vulnerability types
export interface Vulnerability {
	cve_id: string
	cve_slug: string
	severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Unspecified'
	severity_score: number
	package: string
	package_slug: string
	version: string
	version_slug: string
	fixed_in_version: string | null
	last_detected: string
}

export interface VulnerabilityListResponse {
	tag_metadata: TagMetadata
	results: Vulnerability[]
	pagination: Pagination
}

export interface TagMetadata {
	tag_name: string
	tag_slug: string
	last_changed: string
	docker_pull_command: string
	architectures: Architecture[]
	sbom_download_url: string
}

export interface Architecture {
	name: string
	arch_slug: string
	size_mb: number
}

// Package types
export interface Package {
	package: string
	package_slug: string
	version: string
	version_slug: string
	repository: string
	license: string
}

export interface PackageListResponse {
	tag_metadata: TagMetadata
	results: Package[]
	pagination: Pagination
}

// Advisory types
export interface Advisory {
	date_detected: string
	cve_id: string
	cve_slug: string
	package: string
	package_slug: string
	status: 'Under Investigation' | 'Pending Upstream Fix' | 'Fixed' | 'Not Affected' | 'Fix Not Planned'
	advisory_details_url: string
}

export interface AdvisoryListResponse {
	results: Advisory[]
	pagination: Pagination
}

export interface AdvisoryDetails {
	cve_id: string
	cve_slug: string
	package: string
	package_slug: string
	current_status: string
	date_detected: string
	description: string
	references: string[]
	advisory_changes: AdvisoryChange[]
}

export interface AdvisoryChange {
	date: string
	status: string
	fixed_version: string | null
	impact: string
	clarification: string | null
}

// Comparison types
export interface ComparisonData {
	available_alternatives: Alternative[]
	available_periods: Period[]
	selected_alternative: Alternative
	selected_period: Period
	comparison_metrics: ComparisonMetrics
	cves_by_severity_timeline: SeverityTimeline
	net_new_cves_timeline: NetNewCVEsTimeline[]
}

export interface Alternative {
	name: string
	slug: string
}

export interface Period {
	name: string
	slug: string
}

export interface ComparisonMetrics {
	koalalab: Metrics
	alternative: Metrics
	reduction: ReductionMetrics
}

export interface Metrics {
	total_cves: number
	compressed_size_mb: number
	number_of_packages: number
	new_cves_per_month: number
}

export interface ReductionMetrics {
	total_cves_percent: number
	compressed_size_percent: number
	number_of_packages_percent: number
	new_cves_per_month_percent: number
}

export interface SeverityTimeline {
	koalalab: DailyCVECount[]
	alternative: DailyCVECount[]
}

export interface DailyCVECount {
	date: string
	critical: number
	high: number
	medium: number
	low: number
	unknown: number
	total: number
}

export interface NetNewCVEsTimeline {
	date: string
	koalalab: number
	alternative: number
	events: CVEEvent[]
}

export interface CVEEvent {
	type: 'koalalab' | 'alternative'
	cve_id: string
	cve_slug: string
	severity: string
	severity_score: number
}

// Vulnerability details
export interface VulnerabilityDetails {
	cve_id: string
	cve_slug: string
	description: string
	references: string[]
}
