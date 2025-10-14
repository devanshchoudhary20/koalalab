import type { Package, TagMetadata } from '@/types/api'
import { generateSlug } from './helpers'

const basePackages = [
	{ name: 'busybox', version: '1.37.0-r49', repository: 'alpine', license: 'GPL-2.0' },
	{ name: 'openssl', version: '3.1.4-r0', repository: 'alpine', license: 'OpenSSL' },
	{ name: 'zlib', version: '1.3-r1', repository: 'alpine', license: 'Zlib' },
	{ name: 'libcrypto3', version: '3.1.4-r0', repository: 'alpine', license: 'OpenSSL' },
	{ name: 'libssl3', version: '3.1.4-r0', repository: 'alpine', license: 'OpenSSL' },
	{ name: 'musl', version: '1.2.4-r2', repository: 'alpine', license: 'MIT' },
	{ name: 'apk-tools', version: '2.14.0-r2', repository: 'alpine', license: 'GPL-2.0' },
	{ name: 'ca-certificates', version: '20230506-r0', repository: 'alpine', license: 'MPL-2.0' },
	{ name: 'libxml2', version: '2.11.4-r0', repository: 'alpine', license: 'MIT' },
	{ name: 'curl', version: '8.2.1-r0', repository: 'alpine', license: 'MIT' },
	{ name: 'libcurl', version: '8.2.1-r0', repository: 'alpine', license: 'MIT' },
	{ name: 'expat', version: '2.5.0-r0', repository: 'alpine', license: 'MIT' },
	{ name: 'libffi', version: '3.4.4-r0', repository: 'alpine', license: 'MIT' },
	{ name: 'ncurses', version: '6.4_p20230506-r0', repository: 'alpine', license: 'MIT' },
	{ name: 'readline', version: '8.2.1-r0', repository: 'alpine', license: 'GPL-3.0' },
	{ name: 'sqlite', version: '3.42.0-r0', repository: 'alpine', license: 'Public-Domain' },
	{ name: 'xz', version: '5.4.3-r0', repository: 'alpine', license: 'GPL-2.0' },
	{ name: 'libbz2', version: '1.0.8-r4', repository: 'alpine', license: 'bzip2' },
	{ name: 'libgcc', version: '12.2.1_git20220924-r4', repository: 'alpine', license: 'GPL-2.0' },
	{ name: 'libstdc++', version: '12.2.1_git20220924-r4', repository: 'alpine', license: 'GPL-2.0' },
]

export function generatePackagesForTag(
	containerSlug: string,
	tagSlug: string,
	arch: string = 'x86_64'
): { packages: Package[]; tag_metadata: TagMetadata } {
	const packages: Package[] = []

	// Generate 100-200 packages based on container type
	const packageCount = containerSlug === 'python-base' ? 150 : 100

	for (let i = 0; i < packageCount; i++) {
		const basePackage = basePackages[i % basePackages.length]
		const versionVariation = i < basePackages.length ? '' : `.${Math.floor(i / basePackages.length)}`
		
		packages.push({
			package: basePackage.name,
			package_slug: generateSlug(basePackage.name),
			version: `${basePackage.version}${versionVariation}`,
			version_slug: generateSlug(`${basePackage.version}${versionVariation}`),
			repository: basePackage.repository,
			license: basePackage.license,
		})
	}

	// Sort alphabetically by package name
	packages.sort((a, b) => a.package.localeCompare(b.package))

	const tag_metadata: TagMetadata = {
		tag_name: tagSlug,
		tag_slug: generateSlug(tagSlug),
		last_changed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
		docker_pull_command: `docker pull kla.dev/KoalaLab/${containerSlug}:${tagSlug}`,
		architectures: [
			{ name: 'x86_64', arch_slug: 'x86_64', size_mb: 45.2 },
			{ name: 'arm64', arch_slug: 'arm64', size_mb: 42.8 },
		],
		sbom_download_url: `/api/v1/containers/${containerSlug}/tags/${tagSlug}/sbom`,
	}

	return { packages, tag_metadata }
}
