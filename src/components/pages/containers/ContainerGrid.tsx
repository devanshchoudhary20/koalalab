import { Container } from '@/types/api'
import ContainerCard from './ContainerCard'

interface ContainerGridProps {
	containers: Container[]
}

export default function ContainerGrid({ containers }: ContainerGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{containers.map((container) => (
				<ContainerCard key={container.slug} container={container} />
			))}
		</div>
	)
}
