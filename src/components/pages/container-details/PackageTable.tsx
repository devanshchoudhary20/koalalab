import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Package } from '@/types/api'
import { Package as PackageIcon } from 'lucide-react'

interface PackageTableProps {
	packages: Package[]
}

export default function PackageTable({ packages }: PackageTableProps) {
	const getLicenseColor = (license: string) => {
		const licenseColors: Record<string, string> = {
			'MIT': 'bg-green-100 text-green-800 border-green-200',
			'Apache-2.0': 'bg-blue-100 text-blue-800 border-blue-200',
			'GPL-2.0': 'bg-orange-100 text-orange-800 border-orange-200',
			'GPL-3.0': 'bg-red-100 text-red-800 border-red-200',
			'BSD-3-Clause': 'bg-purple-100 text-purple-800 border-purple-200',
			'LGPL-2.1': 'bg-yellow-100 text-yellow-800 border-yellow-200',
			'OpenSSL': 'bg-indigo-100 text-indigo-800 border-indigo-200',
			'Zlib': 'bg-cyan-100 text-cyan-800 border-cyan-200',
			'Public-Domain': 'bg-gray-100 text-gray-800 border-gray-200',
		}
		
		return licenseColors[license] || 'bg-gray-100 text-gray-600 border-gray-200'
	}

	const getRepositoryColor = (repository: string) => {
		const repoColors: Record<string, string> = {
			'alpine': 'bg-blue-100 text-blue-800 border-blue-200',
			'ubuntu': 'bg-orange-100 text-orange-800 border-orange-200',
			'debian': 'bg-red-100 text-red-800 border-red-200',
			'centos': 'bg-purple-100 text-purple-800 border-purple-200',
		}
		
		return repoColors[repository] || 'bg-gray-100 text-gray-600 border-gray-200'
	}

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Package</TableHead>
						<TableHead>Version</TableHead>
						<TableHead>Repository</TableHead>
						<TableHead>License</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{packages.map((pkg, index) => (
						<TableRow key={index} className="hover:bg-muted/50">
							<TableCell>
								<div className="flex items-center space-x-2">
									<PackageIcon className="h-4 w-4 text-muted-foreground" />
									<span className="font-medium">{pkg.package}</span>
								</div>
							</TableCell>
							<TableCell>
								<div className="font-mono text-sm">{pkg.version}</div>
							</TableCell>
							<TableCell>
								<Badge 
									variant="outline" 
									className={getRepositoryColor(pkg.repository)}
								>
									{pkg.repository}
								</Badge>
							</TableCell>
							<TableCell>
								<Badge 
									variant="outline" 
									className={getLicenseColor(pkg.license)}
								>
									{pkg.license}
								</Badge>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
