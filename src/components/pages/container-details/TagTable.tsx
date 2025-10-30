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
							<TableHead className="hidden md:table-cell">Vulnerabilities</TableHead>
							<TableHead className="hidden md:table-cell">Size</TableHead>
							<TableHead className="hidden md:table-cell">Last Changed</TableHead>
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
									{/* Mobile: Show size below tag */}
									<div className="text-muted-foreground text-xs mt-1 md:hidden">
										{formatSize(tag.size.total_mb)} • {formatArchitecture(tag.size.architectures)}
									</div>
								</TableCell>
							<TableCell className="hidden md:table-cell">
								<div className="w-full max-w-xs">
									<div className="h-6 bg-gray-100 rounded overflow-hidden">
										<div className="h-full flex">
											{/* critical */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#E07171' }}>
												{tag.vulnerabilities.critical > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.critical}
													</span>
												)}
											</div>
											{/* high */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FFA071' }}>
												{tag.vulnerabilities.high > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.high}
													</span>
												)}
											</div>
											{/* medium */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FEC98F' }}>
												{tag.vulnerabilities.medium > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.medium}
													</span>
												)}
											</div>
											{/* low */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FCE1A9' }}>
												{tag.vulnerabilities.low > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.low}
													</span>
												)}
											</div>
											{/* negligible */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FFF1C1' }}>
												{tag.vulnerabilities.negligible > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.negligible}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">
								<div className="text-sm">
									<div className="font-medium">{formatSize(tag.size.total_mb)}</div>
									<div className="text-muted-foreground text-xs">
										{formatArchitecture(tag.size.architectures)}
									</div>
								</div>
							</TableCell>
							<TableCell className="hidden md:table-cell">
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
							{/* Mobile: Show vulnerabilities and last changed in second column */}
							<TableCell className="md:hidden">
								<div className="w-full max-w-xs">
									<div className="h-6 bg-gray-100 rounded overflow-hidden">
										<div className="h-full flex">
											{/* critical */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#E07171' }}>
												{tag.vulnerabilities.critical > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.critical}
													</span>
												)}
											</div>
											{/* high */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FFA071' }}>
												{tag.vulnerabilities.high > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.high}
													</span>
												)}
											</div>
											{/* medium */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FEC98F' }}>
												{tag.vulnerabilities.medium > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.medium}
													</span>
												)}
											</div>
											{/* low */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FCE1A9' }}>
												{tag.vulnerabilities.low > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.low}
													</span>
												)}
											</div>
											{/* negligible */}
											<div className="h-full flex items-center justify-center" style={{ width: '20%', backgroundColor: '#FFF1C1' }}>
												{tag.vulnerabilities.negligible > 0 && (
													<span className="text-xs font-semibold text-black">
														{tag.vulnerabilities.negligible}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="text-muted-foreground text-xs mt-1">
									{formatRelativeTime(tag.last_changed)}
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => copyToClipboard(`docker pull kla.dev/KoalaLab/${tag.tag_name}`, tag.tag_name)}
									className="h-6 w-6 p-0 mt-1"
								>
									{copiedTag === tag.tag_name ? (
										<span className="text-green-600">✓</span>
									) : (
										<Copy className="h-3 w-3" />
									)}
								</Button>
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
