import Image from 'next/image'

interface HeroProps {
	title: string
	description: string
	showButton?: boolean
	buttonText?: string
	buttonHref?: string
	backgroundImage?: string
	className?: string
}

export default function Hero({
	title,
	description,
	showButton = false,
	buttonText = 'Try Koala images →',
	buttonHref = '#',
	backgroundImage = '/images/ExplainerBackground.webp',
	className = ''
}: HeroProps) {
	return (
		<section className={`relative section-padding ${className}`}>
			<div className="absolute inset-0 overflow-hidden">
				<Image
					src={backgroundImage}
					alt="Background"
					fill
					className="object-cover"
					quality={85}
					sizes="100vw"
					priority
				/>
			</div>
			<div className="relative section-container">
				<h1 className="text-heading-large text-white text-center">
					{title}
				</h1>
				<p className="text-body-medium text-white text-center mt-7 max-w-3xl mx-auto">
					{description}
				</p>
				{showButton && (
					<div className="flex justify-center mt-8">
						<a
							href={buttonHref}
							className="button-primary"
						>
							{buttonText}
						</a>
					</div>
				)}
			</div>
		</section>
	)
}
