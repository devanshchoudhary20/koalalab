import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
	onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
	const [searchValue, setSearchValue] = useState('')
	const isInitialMount = useRef(true)

	useEffect(() => {
		// Skip the initial mount to prevent infinite loops
		if (isInitialMount.current) {
			isInitialMount.current = false
			return
		}

		const timer = setTimeout(() => {
			onSearch(searchValue)
		}, 300) // Debounce search

		return () => clearTimeout(timer)
	}, [searchValue, onSearch])

	return (
		<div className="relative">
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
			<Input
				placeholder="Q Search KoalaLab Containers"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				className="pl-10 text-sm sm:text-base"
			/>
		</div>
	)
}
