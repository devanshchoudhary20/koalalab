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
		<Link href={`/containers/${container.slug}`}>
			<Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer bg-white border-gray-200 hover:bg-[#1CE8AB]">
				<CardHeader className="pb-3">
					<div className="flex items-start justify-between">
						<div className="flex items-center space-x-3 flex-1 min-w-0">
							<div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
								<Image
									src={container.logo_url}
									alt={container.name}
									width={32}
									height={32}
									className="object-contain"
								/>
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-base sm:text-lg truncate">{container.name}</h3>
								<p className="text-xs sm:text-sm text-muted-foreground">
									{formatRelativeTime(container.last_changed)}
								</p>
							</div>
						</div>
						{container.fips_available && (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Badge 
											variant="secondary" 
											className="text-[#3548A2] bg-inherit border-[#3548A2] hover:text-white hover:bg-[#3548A2] text-xs flex-shrink-0 ml-2 flex items-center gap-1 transition-all duration-200"
										>
											<Shield className="w-3 h-3" />
											<Check className="w-3 h-3" />
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
				</CardHeader>
				<CardContent className="pt-0">
					<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
						{container.description}
					</p>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-1 sm:space-y-0">
						<span className="text-muted-foreground truncate">
							Latest: {container.latest_tag}
						</span>
						<span className="text-muted-foreground">
							+{container.additional_tags_count} tags
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
