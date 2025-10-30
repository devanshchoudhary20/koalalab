import { CTAButtons } from '@/components/shared/common'
import Link from 'next/link'
export default function MinimalContainerDilemma() {
	return (
		<section className="bg-white section-padding">
			<div className="section-container">
				{/* Main Heading */}
				<div className="mb-12">
					<h2 className="text-heading-large text-gray-800">
						The{' '}
						<span className="text-gradient-fill-desktop">Minimal Container</span>{' '}
						Dilemma
					</h2>
				</div>

				{/* Two Column Content */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-12 text-left max-w-5xl mx-auto">
					{/* Left Column */}
					<div className="space-y-6 pl-0 sm:pl-8 text-center sm:text-center">
						<p className="text-body-large text-gray-800">
							While Hardened distroless container images may have been a much talked about buzzword in the last few years, changing your infrastructure to move to hardened images has been a hard challenge across the industry.
						</p>
					</div>

					{/* Right Column */}
					<div className="pr-0 sm:pr-8 text-center sm:text-center">
						<p className="text-body-large text-gray-800">
							Primary challenge stems from the lack of familiarity with newer toolchain (most hardened images are built on some fork of{' '}
							<Link 
								href="https://blogs.mohibulalam.xyz/exploring-lightweight-docker-base-images-alpine-slim-and-debian-releases-bookworm-bullseye-688f88067f4b"
								target="_blank"
								rel="noopener noreferrer"
								className="link-external"
							>
								alpine ↗
							</Link>
							) and/or missing toolchain to work with base container images (in case of{' '}
							<Link 
								href="https://github.com/GoogleContainerTools/distroless"
								target="_blank"
								rel="noopener noreferrer"
								className="link-external"
							>
								distroless ↗
							</Link>
							).
						</p>
					</div>
				</div>

				{/* Full Width Bottom Paragraph */}
				<div className="mb-12">
					<p className="text-body-large text-gray-800 max-w-3xl mx-auto">
						KoalaLab understood these issues and tackled on modernising legacy linux distro(debian) for a container-first design to provide same security(of distroless containers) with a{' '}
						<Link 
							href="https://www.debian.org/doc/manuals/debian-faq/pkgtools.en.html"
							target="_blank"
							rel="noopener noreferrer"
							className="link-external"
						>
							familiar toolchain(apt) ↗
						</Link>
					</p>
				</div>

				{/* Call-to-Action Buttons */}
				<CTAButtons />
			</div>
		</section>
	)
}
