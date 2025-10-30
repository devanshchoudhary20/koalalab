'use client'

import { useState, useRef, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TagsTab from './TagsTab'
import OverviewTab from './OverviewTab'
import VulnerabilitiesTab from './VulnerabilitiesTab'
import SBOMTab from './SBOMTab'
import AdvisoriesTab from './AdvisoriesTab'
import ComparisonTab from './ComparisonTab'
import ProvenanceTab from './ProvenanceTab'

interface TabNavigationProps {
	containerSlug: string
	activeTab?: string
	onTabChange?: (tab: string) => void
}

interface TabIconProps {
	color: string
}

const TabIcon = ({ color }: TabIconProps) => (
	<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M1.20187 13.9742C0.875069 13.9742 0.593055 13.8556 0.355833 13.6183C0.118611 13.3811 0 13.0991 0 12.7723V6.13292H0.945417V12.7723C0.945417 12.8365 0.972153 12.8952 1.02563 12.9485C1.07896 13.002 1.13771 13.0288 1.20187 13.0288H9.52875V13.9742H1.20187ZM3.84292 11.346C3.51486 11.346 3.23042 11.2274 2.98958 10.9902C2.74861 10.753 2.62813 10.471 2.62813 10.1442V3.50479H3.57375V10.1442C3.57375 10.2082 3.60042 10.2669 3.65375 10.3204C3.70722 10.3738 3.76597 10.4004 3.83 10.4004H12.1698V11.346H3.84292ZM6.45833 8.71771C6.13153 8.71771 5.84951 8.5991 5.61229 8.36188C5.37507 8.12465 5.25646 7.84264 5.25646 7.51583V1.20188C5.25646 0.875069 5.37507 0.593056 5.61229 0.355834C5.84951 0.118611 6.13153 0 6.45833 0H14.439C14.7658 0 15.0478 0.118611 15.285 0.355834C15.5222 0.593056 15.6408 0.875069 15.6408 1.20188V7.51583C15.6408 7.84264 15.5222 8.12465 15.285 8.36188C15.0478 8.5991 14.7658 8.71771 14.439 8.71771H6.45833ZM6.45833 7.77229H14.439C14.5031 7.77229 14.5619 7.74556 14.6152 7.69208C14.6687 7.63875 14.6954 7.58 14.6954 7.51583V2.34125H6.20188V7.51583C6.20188 7.58 6.22861 7.63875 6.28208 7.69208C6.33542 7.74556 6.39417 7.77229 6.45833 7.77229Z"
			fill={color}
		/>
	</svg>
)

const tabIcons = [
	TabIcon,
	TabIcon,
	TabIcon,
	TabIcon,
	TabIcon,
	TabIcon,
	TabIcon,
]

const tabs = [
	{ id: 'tags', label: 'Tags' },
	{ id: 'overview', label: 'Overview' },
	{ id: 'comparison', label: 'Comparison' },
	{ id: 'provenance', label: 'Provenance' },
	{ id: 'sbom', label: 'SBOM' },
	{ id: 'vulnerabilities', label: 'Vulnerabilities' },
	{ id: 'advisories', label: 'Advisories' },
]

export default function TabNavigation({ containerSlug, activeTab = 'tags', onTabChange }: TabNavigationProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)
	const isInitialMount = useRef(true)

	const handleTabChange = (newTab: string) => {
		if (onTabChange) {
			onTabChange(newTab)
		}
	}

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

		// Reset scroll position to start from the left on mobile on initial mount
		const resetScroll = () => {
			if (window.innerWidth < 640) {
				container.scrollLeft = 0
			}
		}

		// Reset scroll on mount with a small delay to ensure layout is ready
		const timeoutId = setTimeout(() => {
			resetScroll()
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

	useEffect(() => {
		// Scroll active tab into view when tab changes (only on mobile)
		if (!scrollContainerRef.current) return
		const container = scrollContainerRef.current
		
		// Don't scroll if we're on desktop
		if (window.innerWidth >= 640) return
		
		// On initial mount, just ensure scroll is at 0
		if (isInitialMount.current) {
			isInitialMount.current = false
			container.scrollLeft = 0
			checkScrollability()
			return
		}
		
		// If it's the first tab, reset to start
		if (activeTab === 'tags') {
			container.scrollLeft = 0
			checkScrollability()
			return
		}

		// Small delay to ensure DOM is updated
		const timeoutId = setTimeout(() => {
			const activeTabElement = container.querySelector(
				`[data-state="active"]`
			) as HTMLElement
			if (activeTabElement) {
				activeTabElement.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'start',
				})
			}
		}, 50)

		return () => clearTimeout(timeoutId)
	}, [activeTab])

	return (
		<Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
			<div className="relative border-b border-gray-200">
				{canScrollLeft && (
					<button
						type="button"
						onClick={() => scroll('left')}
						className="absolute left-0 top-0 z-10 h-full flex items-center bg-white pr-2 pl-1 sm:hidden"
						aria-label="Scroll left"
					>
						<ChevronLeft className="h-5 w-5 text-[#3548A2]" />
					</button>
				)}
				<div
					ref={scrollContainerRef}
					className="flex overflow-x-auto scrollbar-hide sm:overflow-visible scroll-smooth w-[80%]"
				>
					<TabsList className="flex w-full sm:grid sm:grid-cols-7 bg-transparent p-0 rounded-none border-0 justify-start sm:justify-stretch">
						{tabs.map((tab, index) => {
							const IconComponent = tabIcons[index]
							return (
								<TabsTrigger
									key={tab.id}
									value={tab.id}
									className="flex items-center justify-center gap-2 bg-transparent border-0 rounded-none text-[#3548A2] opacity-70 data-[state=active]:opacity-100 data-[state=active]:text-[#3548A2] data-[state=active]:border-b-2 data-[state=active]:border-[#3548A2] data-[state=active]:shadow-none hover:opacity-100 transition-opacity whitespace-nowrap min-w-fit sm:min-w-0 px-4 sm:px-0"
								>
									<IconComponent color="currentColor" />
									<span>{tab.label}</span>
								</TabsTrigger>
							)
						})}
					</TabsList>
				</div>
				{canScrollRight && (
					<button
						type="button"
						onClick={() => scroll('right')}
						className="absolute right-0 top-0 z-10 h-full flex items-center bg-white pl-2 pr-1 md:hidden"
						aria-label="Scroll right"
					>
						<ChevronRight className="h-5 w-5 text-[#3548A2]" />
					</button>
				)}
			</div>

			<TabsContent value="tags" className="mt-6">
				<TagsTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="overview" className="mt-6">
				<OverviewTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="comparison" className="mt-6">
				<ComparisonTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="provenance" className="mt-6">
				<ProvenanceTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="sbom" className="mt-6">
				<SBOMTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="vulnerabilities" className="mt-6">
				<VulnerabilitiesTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="advisories" className="mt-6">
				<AdvisoriesTab containerSlug={containerSlug} />
			</TabsContent>
		</Tabs>
	)
}
