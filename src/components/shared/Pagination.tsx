import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
	const getVisiblePages = () => {
		// Show first 6 pages, then ellipsis, then last page
		const pages = []
		
		// Always show first 6 pages
		for (let i = 1; i <= Math.min(6, totalPages); i++) {
			pages.push(i)
		}
		
		// Add ellipsis if there are more than 6 pages
		if (totalPages > 6) {
			pages.push('...')
		}
		
		return pages
	}

	const visiblePages = getVisiblePages()

	return (
		<div className="flex items-center justify-between w-full">
			{/* Pagination Controls */}
			<div className="flex items-center space-x-1">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ChevronLeft className="h-4 w-4" />
					Previous
				</Button>

				{visiblePages.map((page, index) => (
					<Button
						key={index}
						variant="outline"
						size="sm"
						onClick={() => typeof page === 'number' && onPageChange(page)}
						disabled={typeof page !== 'number'}
						className={`w-8 h-8 p-0 text-sm font-medium ${
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
					className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>

			{/* Total Count */}
			{totalResults && (
				<div className="text-sm text-gray-600 font-medium">
					{totalResults.toLocaleString()} images
				</div>
			)}
		</div>
	)
}
