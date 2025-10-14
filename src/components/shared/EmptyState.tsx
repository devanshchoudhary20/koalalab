import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
	icon?: LucideIcon
	title: string
	description: string
	action?: {
		label: string
		onClick: () => void
	}
	className?: string
}

export default function EmptyState({ 
	icon: Icon, 
	title, 
	description, 
	action,
	className = '' 
}: EmptyStateProps) {
	return (
		<Card className={`max-w-md mx-auto ${className}`}>
			<CardContent className="text-center py-12">
				{Icon && (
					<div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
						<Icon className="h-6 w-6 text-muted-foreground" />
					</div>
				)}
				<h3 className="text-lg font-semibold mb-2">{title}</h3>
				<p className="text-muted-foreground mb-4">{description}</p>
				{action && (
					<Button onClick={action.onClick}>
						{action.label}
					</Button>
				)}
			</CardContent>
		</Card>
	)
}
