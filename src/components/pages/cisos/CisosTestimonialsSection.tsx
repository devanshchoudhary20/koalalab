export default function CisosTestimonialsSection() {
	return (
		<section className="bg-gray-50 py-16 px-4">
			<div className="container mx-auto max-w-6xl">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						What CISOs Are Saying
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						Hear from security leaders who have transformed their container security
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Testimonial 1 */}
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<div className="flex items-center mb-4">
							<div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
								<span className="text-teal-600 font-semibold text-lg">JS</span>
							</div>
							<div>
								<h4 className="font-semibold text-gray-900">John Smith</h4>
								<p className="text-sm text-gray-600">CISO, TechCorp</p>
							</div>
						</div>
						<p className="text-gray-700 italic">
							&ldquo;Koala&apos;s container images have reduced our vulnerability management overhead by 70%. 
							Our security team can now focus on strategic initiatives instead of constant patching.&rdquo;
						</p>
					</div>

					{/* Testimonial 2 */}
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<div className="flex items-center mb-4">
							<div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
								<span className="text-teal-600 font-semibold text-lg">MJ</span>
							</div>
							<div>
								<h4 className="font-semibold text-gray-900">Maria Johnson</h4>
								<p className="text-sm text-gray-600">CISO, FinanceFlow</p>
							</div>
						</div>
						<p className="text-gray-700 italic">
							&ldquo;The compliance automation features are a game-changer. We passed our PCI DSS audit 
							in half the time compared to previous years.&rdquo;
						</p>
					</div>

					{/* Testimonial 3 */}
					<div className="bg-white p-6 rounded-lg shadow-sm">
						<div className="flex items-center mb-4">
							<div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
								<span className="text-teal-600 font-semibold text-lg">DR</span>
							</div>
							<div>
								<h4 className="font-semibold text-gray-900">David Rodriguez</h4>
								<p className="text-sm text-gray-600">CISO, HealthTech</p>
							</div>
						</div>
						<p className="text-gray-700 italic">
							&ldquo;With Koala, our development teams can deploy faster while maintaining the highest 
							security standards. It&apos;s the perfect balance of security and productivity.&rdquo;
						</p>
					</div>
				</div>

				{/* Stats Section */}
				<div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
						<div>
							<div className="text-3xl font-bold text-teal-600 mb-2">500+</div>
							<div className="text-gray-600">Enterprise Customers</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-teal-600 mb-2">99.9%</div>
							<div className="text-gray-600">Security Uptime</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-teal-600 mb-2">90%</div>
							<div className="text-gray-600">Fewer Vulnerabilities</div>
						</div>
						<div>
							<div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
							<div className="text-gray-600">Security Monitoring</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
