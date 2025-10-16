import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
	totalResults?: number
}

export default function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	totalResults,
}: PaginationProps) {
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)

	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 640)
			setIsTablet(window.innerWidth < 768)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)
		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])

	const getVisiblePages = () => {
		const pages = []
		
		// Responsive page count: fewer pages on mobile
		const maxPages = isMobile ? 3 : isTablet ? 4 : 6
		
		// Show first few pages, then ellipsis, then last page
		for (let i = 1; i <= Math.min(maxPages, totalPages); i++) {
			pages.push(i)
		}
		
		// Add ellipsis if there are more pages than max
		if (totalPages > maxPages) {
			pages.push('...')
		}
		
		return pages
	}

	const visiblePages = getVisiblePages()

	return (
		<div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
			{/* Pagination Controls */}
			<div className="flex items-center space-x-1">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
					<span className="hidden xs:inline">Previous</span>
					<span className="xs:hidden">Prev</span>
				</Button>

				{visiblePages.map((page, index) => (
					<Button
						key={index}
						variant="outline"
						size="sm"
						onClick={() => typeof page === 'number' && onPageChange(page)}
						disabled={typeof page !== 'number'}
						className={`w-6 h-6 sm:w-8 sm:h-8 p-0 text-xs sm:text-sm font-medium ${
							page === currentPage
								? 'bg-green-600 text-white border-green-600 hover:bg-green-700'
								: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
						} ${typeof page !== 'number' ? 'cursor-default' : 'cursor-pointer'}`}
					>
						{page}
					</Button>
				))}

				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<span className="hidden xs:inline">Next</span>
					<span className="xs:hidden">Next</span>
					<ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
				</Button>
			</div>

			{/* Total Count - Hidden on mobile */}
			{totalResults && (
				<div className="text-xs sm:text-sm text-gray-600 font-medium hidden sm:block">
					{totalResults.toLocaleString()} images
				</div>
			)}
		</div>
	)
}
