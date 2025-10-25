import Image from 'next/image'

export default function HowItWorksImage() {
	return (
		<section className="w-full bg-primary-background_purple  py-16 pb-0">
			<div className="max-w-5xl mx-auto">
				<Image
					src="/images/HowItWorks.webp"
					alt="How It Works"
					width={1000}
					height={1000}
					className="w-full h-full object-cover"
				/>
			</div>
		</section>
	)
}
