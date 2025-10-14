import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
	return (
		<header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center space-x-4">
						<Link href="/" className="flex items-center space-x-2">
							<div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
								<span className="text-primary-foreground font-bold text-sm">K</span>
							</div>
							<span className="font-bold text-xl">KoalaLab</span>
						</Link>
						<nav className="hidden md:flex items-center space-x-6">
							<Link 
								href="/containers" 
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Directory
							</Link>
							<Link 
								href="/security" 
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Security Advisories
							</Link>
							<Link 
								href="/pricing" 
								className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
							>
								Pricing
							</Link>
						</nav>
					</div>
					
					<div className="flex items-center space-x-4">
						<Button variant="ghost" size="sm">
							Sign in
						</Button>
						<Button 
							size="sm"
							className="bg-gradient-fill-desktop text-white hover:bg-gradient-fill-desktop/90"
						>
							Request a trial
						</Button>
					</div>
				</div>
			</div>
		</header>
	)
}
