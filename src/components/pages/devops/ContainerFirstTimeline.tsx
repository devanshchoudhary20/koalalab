export default function ContainerFirstTimeline() {
	return (
		<section 
			className="section-padding" 
			style={{ 
				background: 'linear-gradient(to bottom, #FFFFFF 20%, #F4EDF9 80%)'
			}}
		>
			<div className="section-container">
				{/* Main Title */}
				<div className="mb-16 text-center">
					<h2 className="text-heading-medium text-primary-text_blue ">
						Koala&apos;s container-first approach, reimagined Debian for a container-first world:
					</h2>
				</div>

				{/* Timeline Container */}
				<div className="relative max-w-6xl mx-auto">
					{/* Timeline Line - From first dot to last dot */}
					<div className="absolute top-[30%] md:top-1/2 left-[8.5%] right-[8.5%] h-0.5 bg-gradient-fill-desktop transform -translate-y-1/2 z-0"></div>
					
					{/* Desktop Timeline Points - Hidden on mobile */}
					<div className="hidden md:flex relative justify-between items-center ">
						{/* Point 1: Bootstrapped Debian-like Distro */}
						<div className="flex flex-col items-center text-center max-w-[200px] ">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								Bootstrapped Debian-like Distro
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Created with only essential base packages
							</p>
						</div>

						{/* Point 2: DebFlow */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								DebFlow
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Modernized OSS deb package creation process
							</p>
						</div>

						{/* Point 3: Minimal Package Universe */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								Minimal Package Universe
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Proprietary repository where all packages are minimal by design
							</p>
						</div>

						{/* Point 4: C(APT)ain */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								C(APT)ain
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								A portable Go-based package manager that&apos;s fully compatible with Debian
							</p>
						</div>

						{/* Point 5: Optimized Container Creation */}
						<div className="flex flex-col items-center text-center max-w-[200px]">
							<h3 className="text-heading-small text-primary-text_blue mb-4 font-semibold h-[50px]">
								Optimized Container Creation
							</h3>
							<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
							<p className="text-body-small text-gray-800 h-[45px]">
								Using the bootstrapped distro and minimal package universe
							</p>
						</div>
					</div>

					{/* Mobile Timeline - Horizontal Scrollable */}
					<div className="md:hidden">
						<div className="flex overflow-x-auto pb-4 space-x-8 snap-x snap-mandatory scrollbar-hide">
							{/* Point 1: Bootstrapped Debian-like Distro */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										Bootstrapped Debian-like Distro
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Created with only essential base packages
									</p>
								</div>
							</div>

							{/* Point 2: DebFlow */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										DebFlow
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Modernized OSS deb package creation process
									</p>
								</div>
							</div>

							{/* Point 3: Minimal Package Universe */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										Minimal Package Universe
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Proprietary repository where all packages are minimal by design
									</p>
								</div>
							</div>

							{/* Point 4: C(APT)ain */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										C(APT)ain
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-2 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										A portable Go-based package manager that&apos;s fully compatible with Debian
									</p>
								</div>
							</div>

							{/* Point 5: Optimized Container Creation */}
							<div className="flex-shrink-0 w-64 snap-center">
								<div className="flex flex-col items-center text-center">
									<h3 className="text-heading-small text-primary-text_blue mb-2 font-semibold">
										Optimized Container Creation
									</h3>
									<div className="w-3 h-3 bg-gradient-fill-desktop rounded-sm mb-4 relative z-10 transform -translate-y-0.5 shadow-[0px_0px_2px_8px_rgba(73,201,183,0.5)]"></div>
									<p className="text-body-small text-gray-800">
										Using the bootstrapped distro and minimal package universe
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</section>
	)
}
