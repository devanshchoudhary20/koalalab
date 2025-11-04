import Link from 'next/link'
import { CTAButtons } from '@/components/shared/common'

export default function FamiliarDevExSection() {
	return (
		<section className="bg-white section-padding">
			<div className="section-container">
				{/* Main Title */}
				<div className="text-center mb-8">
					<h2 className="text-heading-large text-gray-800 mb-4">
						Familiar DevEx.{' '}
						<span className="text-gradient-fill-desktop">easier adoption</span>
					</h2>
				</div>

				{/* Introductory Paragraph */}
				<div className="text-center mb-12">
					<p className="text-body-medium text-primary-text_blue max-w-3xl mx-auto">
						Industry has known about minimal or distroless containers as an idea to reduce attack surface & make containers more secure but adoption across enterprises has been a huge challenge:
					</p>
				</div>

				{/* Problem Statements - Two Columns */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
					{/* Section 1 */}
					<div className="space-y-1">
						<h3 className="text-heading-small text-gray-800">
							1. Missing toolchain for distro-less containers:
						</h3>
						<p className="text-body-small text-gray-700">
							Platform engineering teams use toolchain like{' '}
							<Link href="#" className="link-external inline-flex items-center gap-1">
								apt 
							</Link><span aria-hidden="true" className='no-underline text-primary-text_blue'>↗</span>{' '}
							to work on base containers for custom use-cases. Missing toolchains (for distro-less containers) and/or newer ecosystem ({' '}
							<Link href="#" className="link-external inline-flex items-center gap-1">
								alpine-based containers
							</Link>{' '}
							) <span aria-hidden="true" className='no-underline text-primary-text_blue'>↗</span> made for tougher adoption.
						</p>
					</div>

					{/* Section 2 */}
					<div className="space-y-1">
						<h3 className="text-heading-small text-gray-800">
							2. Coverage across the whole cloud-native stack.
						</h3>
						<p className="text-body-small text-gray-700">
							Even in cases where developers learnt the newer tooling (or made do with a lack of it), coverage across the entire cloud-native stack remained rare & or has some{' '}
							<Link href="#" className="link-external inline-flex items-center gap-1">
								edgecase bugs 
							</Link>
							.<span aria-hidden="true" className='no-underline text-primary-text_blue'>↗</span>
						</p>
					</div>
				</div>

				{/* Solution Paragraph */}
				<div className="text-center mb-12">
					<p className="text-body-medium text-primary-text_blue max-w-3xl mx-auto">
						Koala&apos;s containers are built on 0-deb, for the specific purpose to provide a familiar user experience for developers. c(apt)-ain is koala&apos;s adpation of apt & provides similar UX in both commands and dockerfiles; enabling a distro-like experience for enteprise centric custom use-cases while providing security of distroless philosophy.
					</p>
				</div>

				{/* Call to Action Buttons */}
				<CTAButtons talkToUsHref="#" />
			</div>
		</section>
	)
}
