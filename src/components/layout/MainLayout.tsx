import { ReactNode } from 'react'
import Header from './Header'
import ErrorBoundary from '@/components/shared/ErrorBoundary'

interface MainLayoutProps {
	children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<ErrorBoundary>
			<div className="min-h-screen bg-background">
				<Header />
				<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
					{children}
				</main>
			</div>
		</ErrorBoundary>
	)
}
