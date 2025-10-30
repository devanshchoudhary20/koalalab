import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Container } from '@/types/api'
import { formatRelativeTime } from '@/lib/utils/formatters'
import { Shield, Check } from 'lucide-react'

interface ContainerCardProps {
	container: Container
}

export default function ContainerCard({ container }: ContainerCardProps) {
	return (
		<Link href={`/containers/${container.slug}`} className="h-full">
			<Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border-[#1CE8AB] hover:bg-[#E0FFF6] flex flex-col">
				<CardHeader className="pb-3">
					<div className="flex flex-col space-y-2">
						{/* Icon and FIPS badge on same line */}
						<div className="flex items-center justify-between">
							<div className="w-6 h-6 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
								<Image
									src={container.logo_url}
									alt={container.name}
									width={18}
									height={18}
									className="object-contain"
								/>
							</div>
							{container.fips_available && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Badge 
												variant="secondary" 
												className="text-[#3443F4] bg-white border-[#3548A2] hover:text-[#3443F4] hover:bg-white text-xs flex-shrink-0 flex items-center gap-1 transition-all duration-200"
											>
												<Shield className="w-3 h-3 text-[#3443F4]" />
												<Check className="w-3 h-3 text-[#3443F4]" />
												FIPS available
											</Badge>
										</TooltipTrigger>
										<TooltipContent side="top" className="bg-green-600 text-white border-green-600">
											<p>A FIPS validated version of this image is available for S140-2 compliance. S140 is published with FIPS 140-3.</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</div>
						{/* Heading on next line */}
						<h3 className="text-[14px] font-bold truncate" style={{ fontFamily: 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif' }}>
							{container.name}
						</h3>
						{/* Last changed on next line */}
						<p className="text-[11px] font-normal text-[#14003D]/50" style={{ fontFamily: 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif' }}>
							Last changed {formatRelativeTime(container.last_changed)}
						</p>
					</div>
				</CardHeader>
				<CardContent className="pt-0 flex-1 flex flex-col">
					<p className="text-[12px] font-normal text-muted-foreground mb-3 line-clamp-2 flex-shrink-0" style={{ fontFamily: 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif' }}>
						{container.description}
					</p>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-start text-[11px] font-normal space-y-1 sm:space-y-0 sm:gap-1 mt-auto" style={{ fontFamily: 'var(--font-noto-sans), ui-sans-serif, system-ui, sans-serif' }}>
						<span className="text-[#14003D]/50 truncate">
							Latest tag:{' '}
							<span className="text-black">
								{container.latest_tag}
							</span>
						</span>
						<span className="text-[#14003D]/50 w-1/2">
							+ {container.additional_tags_count} more tags
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
