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
		<section className={`relative py-20 sm:py-28 ${className}`}>
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
			<div className="relative container mx-auto px-4">
				<h1 className="text-6xl font-bold text-white text-center font-heading">
					{title}
				</h1>
				<p className="text-lg text-white text-center mt-7 max-w-3xl mx-auto font-content">
					{description}
				</p>
				{showButton && (
					<div className="flex justify-center mt-8">
						<a
							href={buttonHref}
							className="bg-gradient-fill-desktop text-primary-text_blue font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
						>
							{buttonText}
						</a>
					</div>
				)}
			</div>
		</section>
	)
}
