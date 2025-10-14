import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
	onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		const timer = setTimeout(() => {
			onSearch(searchValue)
		}, 300) // Debounce search

		return () => clearTimeout(timer)
	}, [searchValue, onSearch])

	return (
		<div className="relative">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input
				placeholder="Search KoalaLab Containers"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				className="pl-10 text-sm sm:text-base"
			/>
		</div>
	)
}
