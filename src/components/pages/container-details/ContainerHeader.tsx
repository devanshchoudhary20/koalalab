import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Shield } from 'lucide-react'
import { Container } from '@/types/api'
import { formatRelativeTime } from '@/lib/utils/formatters'

interface ContainerHeaderProps {
	container: Container
}

export default function ContainerHeader({ container }: ContainerHeaderProps) {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Breadcrumb */}
			<nav className="flex items-center space-x-2 text-xs sm:text-sm">
				<Link href="/containers" className="text-[#3443F4]">
					← Directory
				</Link>
			</nav>

			{/* Container Info - Wrapped in border */}
			<div className="bg-white border border-[#1CE8AB] rounded-lg p-4 sm:p-6">
				<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6">
					<div className="flex-1 w-full">
						<div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
							<div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
								<Image
									src={container.logo_url}
									alt={container.name}
									width={64}
									height={64}
									className="object-contain"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 break-words">{container.name}</h1>
								<p className="text-sm sm:text-base text-[#14003D]/70">
									Last changed {formatRelativeTime(container.last_changed)}
								</p>
							</div>
						</div>
						<p className="text-base sm:text-lg text-[#14003D]/70 mb-3 sm:mb-4">
							{container.description}
						</p>
						{container.fips_available && (
							<Badge variant="secondary" className="bg-white text-[#3443F4] border border-[#394CA9] text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5">
								<Shield className="w-3 h-3 mr-1 sm:mr-1.5 text-[#3443F4]" />
								FIPS available
							</Badge>
						)}
					</div>

					{/* Try for Free Section */}
					<div className="w-full lg:w-[40%]">
						<h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-[#14003D]">Try the latest tag for free</h3>
						<div className="space-y-2 sm:space-y-3">
							<div className="flex items-center gap-2">
								<div className="flex items-center justify-between flex-1 bg-white border border-[#D1D5DB] rounded px-2 sm:px-3 py-1.5 sm:py-2 min-w-0">
									<code className="text-xs sm:text-sm font-mono text-[#14003D] break-all pr-2">
										docker pull kla.dev/KoalaLab/{container.name}
									</code>
									<button
										type="button"
										onClick={() => copyToClipboard(`docker pull kla.dev/KoalaLab/${container.name}`)}
										className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-white flex-shrink-0"
									>
										<Copy className="h-4 w-4 sm:h-5 sm:w-5 text-[#3443F4]" />
									</button>
								</div>
							</div>
							<p className="text-xs sm:text-sm text-[#14003D]">
								Need access to a specific tag?{' '}
								<Link href="/contact" className="text-[#3443F4] underline">
									Contact us
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* CTA Banner */}
			<div className="bg-[#E0FFF6] border border-[#14003D]/12 rounded-lg p-4 sm:p-6">
				<div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
					<h3 className="font-semibold text-[#14003D] text-base sm:text-[20px] whitespace-nowrap">
						Create your free account
					</h3>
					<p className="text-[12px] sm:text-[12px] text-[#14003D] flex-1">
						Integrate KoalaLab into your developer workflows, manage your image versions to stay free of CVEs, and view critical SBOM and provenance details.
					</p>
					<Button className="bg-[#1CE8AB] hover:bg-[#1CE8AB] text-[#1a1a1a] whitespace-nowrap text-xs sm:text-[14px] px-4 sm:px-6 py-2 w-full md:w-auto">
						Request a trial
					</Button>
				</div>
			</div>
		</div>
	)
}
