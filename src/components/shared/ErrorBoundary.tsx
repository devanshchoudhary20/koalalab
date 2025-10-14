import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
	children: ReactNode
	fallback?: ReactNode
}

interface State {
	hasError: boolean
	error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined })
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback
			}

			return (
				<Card className="max-w-md mx-auto mt-8">
					<CardHeader>
						<CardTitle className="flex items-center space-x-2 text-destructive">
							<AlertTriangle className="h-5 w-5" />
							<span>Something went wrong</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground mb-4">
							We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
						</p>
						{process.env.NODE_ENV === 'development' && this.state.error && (
							<details className="mb-4">
								<summary className="cursor-pointer text-sm font-medium">
									Error Details (Development)
								</summary>
								<pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
									{this.state.error.message}
									{this.state.error.stack}
								</pre>
							</details>
						)}
						<div className="flex space-x-2">
							<Button onClick={this.handleReset} variant="outline">
								<RefreshCw className="h-4 w-4 mr-2" />
								Try Again
							</Button>
							<Button onClick={() => window.location.reload()}>
								Refresh Page
							</Button>
						</div>
					</CardContent>
				</Card>
			)
		}

		return this.props.children
	}
}
