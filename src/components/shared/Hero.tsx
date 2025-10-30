import Image from 'next/image'

interface HeroProps {
	title: string
	subtitle?: string
	description: string
	showButton?: boolean
	buttonText?: string
	buttonHref?: string
	backgroundImage?: string
	className?: string
}

export default function Hero({
	title,
	subtitle,
	description,
	showButton = false,
	buttonText = 'Try Koala images →',
	buttonHref = '#',
	className = ''
}: HeroProps) {
	return (
		<section className={`relative section-padding ${className}`}>
			{/* Gradient Background */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#38BDB6] to-[#B5B3FF]" />
			
			{/* Panda Layer with Overlay Light */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl h-full">
					<div className="relative w-full h-full">
						{/* Light Overlay Gradient */}
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/30 z-10" />
						{/* Panda Image */}
						<Image
							src="/images/PandaLayer.webp"
							alt="Panda Layer"
							fill
							className="sm:object-fill object- object-bottom opacity-10"
							quality={90}
							sizes="(max-width: 768px) 0vw, 50vw"
							priority
						/>
					</div>
				</div>
			</div>
			<div className="relative section-container">
				<h1 className="text-heading-large text-white text-center">
					{title}
				</h1>
				{subtitle && (
					<h2 className="text-heading-small text-white text-center mt-4 font-bold">
						{subtitle}
					</h2>
				)}
				<p className="text-body-medium text-white text-center max-w-2xl mx-auto">
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
