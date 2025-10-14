import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TagsTab from './TagsTab'
import OverviewTab from './OverviewTab'
import VulnerabilitiesTab from './VulnerabilitiesTab'
import SBOMTab from './SBOMTab'
import AdvisoriesTab from './AdvisoriesTab'
import ComparisonTab from './ComparisonTab'
import ProvenanceTab from './ProvenanceTab'

interface TabNavigationProps {
	containerSlug: string
	activeTab?: string
	onTabChange?: (tab: string) => void
}

const tabs = [
	{ id: 'tags', label: 'Tags', icon: '📋' },
	{ id: 'overview', label: 'Overview', icon: '📄' },
	{ id: 'comparison', label: 'Comparison', icon: '📊' },
	{ id: 'provenance', label: 'Provenance', icon: '🔍' },
	{ id: 'sbom', label: 'SBOM', icon: '📦' },
	{ id: 'vulnerabilities', label: 'Vulnerabilities', icon: '⚠️' },
	{ id: 'advisories', label: 'Advisories', icon: '📢' },
]

export default function TabNavigation({ containerSlug, activeTab = 'tags', onTabChange }: TabNavigationProps) {
	const handleTabChange = (newTab: string) => {
		if (onTabChange) {
			onTabChange(newTab)
		}
	}

	return (
		<Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
			<TabsList className="grid w-full grid-cols-7">
				{tabs.map((tab) => (
					<TabsTrigger key={tab.id} value={tab.id} className="flex items-center space-x-2">
						<span>{tab.icon}</span>
						<span className="hidden sm:inline">{tab.label}</span>
					</TabsTrigger>
				))}
			</TabsList>

			<TabsContent value="tags" className="mt-6">
				<TagsTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="overview" className="mt-6">
				<OverviewTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="comparison" className="mt-6">
				<ComparisonTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="provenance" className="mt-6">
				<ProvenanceTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="sbom" className="mt-6">
				<SBOMTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="vulnerabilities" className="mt-6">
				<VulnerabilitiesTab containerSlug={containerSlug} />
			</TabsContent>

			<TabsContent value="advisories" className="mt-6">
				<AdvisoriesTab containerSlug={containerSlug} />
			</TabsContent>
		</Tabs>
	)
}
