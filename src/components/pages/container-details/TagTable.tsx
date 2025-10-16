import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Copy, Info } from 'lucide-react'
import { Tag } from '@/types/api'
import { formatRelativeTime, formatSize, formatArchitecture } from '@/lib/utils/formatters'
import TagPackagesDrawer from './TagPackagesDrawer'

interface TagTableProps {
	tags: Tag[]
	containerSlug: string
}

export default function TagTable({ tags, containerSlug }: TagTableProps) {
	const [copiedTag, setCopiedTag] = useState<string | null>(null)
	const [selectedTag, setSelectedTag] = useState<Tag | null>(null)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)

	const copyToClipboard = (text: string, tagName: string) => {
		navigator.clipboard.writeText(text)
		setCopiedTag(tagName)
		setTimeout(() => setCopiedTag(null), 2000)
	}

	const getVulnerabilityColor = (count: number, severity: string) => {
		if (count === 0) return 'text-green-600'
		if (severity === 'critical') return 'text-severity-critical'
		if (severity === 'high') return 'text-severity-high'
		if (severity === 'medium') return 'text-severity-medium'
		return 'text-severity-low'
	}

	const handleTagClick = (tag: Tag) => {
		setSelectedTag(tag)
		setIsDrawerOpen(true)
	}

	return (
		<>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Tag</TableHead>
							<TableHead>Vulnerabilities</TableHead>
							<TableHead>Size</TableHead>
							<TableHead>Last Changed</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tags.map((tag, index) => (
							<TableRow key={index} className="hover:bg-muted/50">
								<TableCell>
									<div className="flex items-center space-x-2">
										<Button
											variant="link"
											className="p-0 h-auto text-blue-600 hover:text-blue-800 font-medium text-left justify-start font-mono text-sm"
											onClick={() => handleTagClick(tag)}
										>
											{tag.tag_name}
										</Button>
										<Info className="h-4 w-4 text-muted-foreground" />
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center space-x-2">
										<div className="flex space-x-1">
											<span className={`text-xs font-medium ${getVulnerabilityColor(tag.vulnerabilities.critical, 'critical')}`}>
												{tag.vulnerabilities.critical}
											</span>
											<span className={`text-xs font-medium ${getVulnerabilityColor(tag.vulnerabilities.high, 'high')}`}>
												{tag.vulnerabilities.high}
											</span>
											<span className={`text-xs font-medium ${getVulnerabilityColor(tag.vulnerabilities.medium, 'medium')}`}>
												{tag.vulnerabilities.medium}
											</span>
											<span className={`text-xs font-medium ${getVulnerabilityColor(tag.vulnerabilities.low, 'low')}`}>
												{tag.vulnerabilities.low}
											</span>
											<span className={`text-xs font-medium ${getVulnerabilityColor(tag.vulnerabilities.negligible, 'negligible')}`}>
												{tag.vulnerabilities.negligible}
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="text-sm">
										<div className="font-medium">{formatSize(tag.size.total_mb)}</div>
										<div className="text-muted-foreground text-xs">
											{formatArchitecture(tag.size.architectures)}
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="text-sm">
										<div>{formatRelativeTime(tag.last_changed)}</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => copyToClipboard(`docker pull kla.dev/KoalaLab/${tag.tag_name}`, tag.tag_name)}
											className="h-6 w-6 p-0"
										>
											{copiedTag === tag.tag_name ? (
												<span className="text-green-600">✓</span>
											) : (
												<Copy className="h-3 w-3" />
											)}
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			{/* Tag Packages Drawer */}
			{selectedTag && (
				<TagPackagesDrawer
					containerSlug={containerSlug}
					tag={selectedTag}
					isOpen={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
				/>
			)}
		</>
	)
}
