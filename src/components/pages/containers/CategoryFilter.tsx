import { Button } from '@/components/ui/button'

interface Category {
	id: string
	label: string
}

interface CategoryFilterProps {
	categories: Category[]
	selectedCategory: string
	onCategoryChange: (category: string) => void
}

export default function CategoryFilter({
	categories,
	selectedCategory,
	onCategoryChange,
}: CategoryFilterProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{categories.map((category) => (
				<Button
					key={category.id}
					variant={selectedCategory === category.id ? 'default' : 'outline'}
					size="sm"
					onClick={() => onCategoryChange(category.id)}
					className={`rounded-full text-xs sm:text-sm px-4 py-2 ${
						selectedCategory === category.id
							? 'bg-primary text-primary-foreground border-primary'
							: 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
					}`}
				>
					{category.label}
				</Button>
			))}
		</div>
	)
}
