import Link from 'next/link'

interface CTAButtonsProps {
	talkToUsHref?: string
	exploreImagesHref?: string
	className?: string
	primaryButtonPadding?: string
}

export default function CTAButtons({ 
	talkToUsHref = "#contact", 
	exploreImagesHref = "/containers",
	className = "",
	primaryButtonPadding = "px-4"
}: CTAButtonsProps) {
	const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		const contactSection = document.getElementById('contact')
		if (contactSection) {
			const headerHeight = 80 // Approximate header height
			const targetPosition = contactSection.offsetTop - headerHeight
			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth'
			})
		}
	}

	return (
		<div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
			<Link
				href={talkToUsHref}
				onClick={talkToUsHref === "#contact" ? scrollToContact : undefined}
				className={`rounded-md bg-gradient-fill-desktop ${primaryButtonPadding} py-2.5 text-sm text-gradient-fill-submitButton min-w-[132px]`}
			>
				Talk to us <span aria-hidden="true">→</span>
			</Link>
			{/*
				<Link 
					href={exploreImagesHref} 
					className="text-sm/6 text-gradient-fill-blueText border border-gradient-fill-blueText px-2.5 py-1.5 rounded-md min-w-[132px]"
				>
					Explore images <span aria-hidden="true">→</span>
				</Link>
			*/}
		</div>
	)
}
