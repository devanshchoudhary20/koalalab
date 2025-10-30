'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ContainerFirstTimeline() {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)

	const checkScrollability = () => {
		if (!scrollContainerRef.current) return
		const container = scrollContainerRef.current
		setCanScrollLeft(container.scrollLeft > 0)
		setCanScrollRight(
			container.scrollLeft < container.scrollWidth - container.clientWidth - 1
		)
	}

	const scroll = (direction: 'left' | 'right') => {
		if (!scrollContainerRef.current) return
		const container = scrollContainerRef.current
		const scrollAmount = container.clientWidth * 0.7
		const newScrollLeft =
			direction === 'left'
				? container.scrollLeft - scrollAmount
				: container.scrollLeft + scrollAmount

		container.scrollTo({
			left: newScrollLeft,
			behavior: 'smooth',
		})
	}

	useEffect(() => {
		const container = scrollContainerRef.current
		if (!container) return

		// Check scrollability on mount with delay to ensure layout is ready
		const timeoutId = setTimeout(() => {
			checkScrollability()
		}, 0)

		checkScrollability()
		container.addEventListener('scroll', checkScrollability)

		const resizeObserver = new ResizeObserver(() => {
			checkScrollability()
		})
		resizeObserver.observe(container)

		return () => {
			clearTimeout(timeoutId)
			container.removeEventListener('scroll', checkScrollability)
			resizeObserver.disconnect()
		}
	}, [])

	return (
		<section 
			className="section-padding" 
			style={{ 
				background: 'linear-gradient(to bottom, #FFFFFF 20%, #F4EDF9 80%)'
			}}
		>
			<div className="section-container">
				{/* Main Title */}
				<div className="mb-16 text-center">
					<h2 className="text-heading-medium text-primary-text_blue ">
						Koala&apos;s container-first approach, reimagined Debian for a container-first world:
					</h2>
				</div>

				{/* Timeline Container */}
				<div className="relative max-w-6xl mx-auto">
					{/* Timeline Line - From first dot to last dot */}
					<div className="absolute top-[30%] md:top-1/2 left-[8.5%] right-[8.5%] h-0.5 bg-gradient-fill-desktop transform -translate-y-1/2 z-0"></div>
					
					{/* Desktop Timeline Points - Hidden on mobile */}
					<div className="hidden md:flex relative justify-between items-center ">
						{/* Point 1: Bootstrapped Debian-like Distro */}
						<div className="flex flex-col items-center text-center max-w-[200px] ">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								Bootstrapped Debian-like Distro
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Created with only essential base packages
							</p>
						</div>

						{/* Point 2: DebFlow */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								DebFlow
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Modernized OSS deb package creation process
							</p>
						</div>

						{/* Point 3: Minimal Package Universe */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								Minimal Package Universe
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Proprietary repository where all packages are minimal by design
							</p>
						</div>

						{/* Point 4: C(APT)ain */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								C(APT)ain
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								A portable Go-based package manager that&apos;s fully compatible with Debian
							</p>
						</div>

						{/* Point 5: Optimized Container Creation */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								Optimized Container Creation
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Using the bootstrapped distro and minimal package universe
							</p>
						</div>
					</div>

					{/* Mobile Timeline - Horizontal Scrollable */}
					<div className="md:hidden relative">
						{canScrollLeft && (
							<button
								type="button"
								onClick={() => scroll('left')}
								className="absolute left-0 top-[30%] -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/90 transition-colors"
								aria-label="Scroll left"
							>
								<ChevronLeft className="h-6 w-6 text-primary-text_blue" />
							</button>
						)}
						<div 
							ref={scrollContainerRef}
							className="flex overflow-x-auto pb-4 space-x-8 snap-x snap-mandatory scrollbar-hide scroll-smooth"
						>
							{/* Point 1: Bootstrapped Debian-like Distro */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										Bootstrapped Debian-like Distro
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Created with only essential base packages
									</p>
								</div>
							</div>

							{/* Point 2: DebFlow */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										DebFlow
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Modernized OSS deb package creation process
									</p>
								</div>
							</div>

							{/* Point 3: Minimal Package Universe */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										Minimal Package Universe
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Proprietary repository where all packages are minimal by design
									</p>
								</div>
							</div>

							{/* Point 4: C(APT)ain */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										C(APT)ain
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-2 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										A portable Go-based package manager that&apos;s fully compatible with Debian
									</p>
								</div>
							</div>

							{/* Point 5: Optimized Container Creation */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										Optimized Container Creation
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Using the bootstrapped distro and minimal package universe
									</p>
								</div>
							</div>
						</div>
						{canScrollRight && (
							<button
								type="button"
								onClick={() => scroll('right')}
								className="absolute right-0 top-[30%] -translate-y-1/2 z-20 h-8 w-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white/90 transition-colors"
								aria-label="Scroll right"
							>
								<ChevronRight className="h-6 w-6 text-primary-text_blue" />
							</button>
						)}
					</div>
				</div>

			</div>
		</section>
	)
}
