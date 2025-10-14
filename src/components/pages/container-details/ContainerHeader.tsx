import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
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
		<div className="space-y-6">
			{/* Breadcrumb */}
			<nav className="flex items-center space-x-2 text-sm">
				<Link href="/containers" className="text-muted-foreground hover:text-foreground">
					← Directory
				</Link>
			</nav>

			{/* Container Info */}
			<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
				<div className="flex-1">
					<div className="flex items-start space-x-3 sm:space-x-4 mb-4">
						<div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
							<Image
								src={container.logo_url}
								alt={container.name}
								width={48}
								height={48}
								className="object-contain"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h1 className="text-2xl sm:text-3xl font-bold truncate">{container.name}</h1>
							<p className="text-sm sm:text-base text-muted-foreground">
								Last changed {formatRelativeTime(container.last_changed)}
							</p>
						</div>
					</div>
					<p className="text-base sm:text-lg text-muted-foreground mb-4">
						{container.description}
					</p>
					{container.fips_available && (
						<Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-sm">
							<Shield className="w-3 h-3 mr-1" />
							FIPS available
						</Badge>
					)}
				</div>

				{/* Try for Free Section */}
				<Card className="w-full lg:w-80">
					<CardContent className="p-4 sm:p-6">
						<h3 className="font-semibold mb-4 text-sm sm:text-base">Try the latest tag for free</h3>
						<div className="space-y-3">
							<div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
								<code className="flex-1 bg-muted px-3 py-2 rounded text-xs sm:text-sm font-mono break-all">
									docker pull kla.dev/KoalaLab/{container.name}
								</code>
								<Button
									size="sm"
									variant="outline"
									onClick={() => copyToClipboard(`docker pull kla.dev/KoalaLab/${container.name}`)}
									className="w-full sm:w-auto"
								>
									<Copy className="h-4 w-4" />
								</Button>
							</div>
							<p className="text-xs sm:text-sm text-muted-foreground">
								Need access to a specific tag?{' '}
								<Link href="/contact" className="text-primary hover:underline">
									Contact us
								</Link>
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* CTA Banner */}
			<Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
				<CardContent className="p-4 sm:p-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h3 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">
								Create your free account
							</h3>
							<p className="text-green-700 text-xs sm:text-sm">
								Integrate KoalaLab into your developer workflows, manage your image versions to stay free of CVEs, and view critical SBOM and provenance details.
							</p>
						</div>
						<Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto text-sm">
							Request a trial
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
