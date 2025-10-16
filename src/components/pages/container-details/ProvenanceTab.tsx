import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
	GitBranch, 
	Clock, 
	User, 
	Hash, 
	Shield, 
	Download,
	ExternalLink,
	CheckCircle,
	Info
} from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils/formatters'

interface ProvenanceTabProps {
	containerSlug: string
}

export default function ProvenanceTab({ containerSlug: _containerSlug }: ProvenanceTabProps) {
	// Mock provenance data - in a real app this would come from an API
	const provenanceData = {
		build_id: 'build-12345-abcde',
		build_date: '2024-01-15T10:30:00Z',
		build_duration: '2m 45s',
		build_status: 'success',
		build_trigger: 'push',
		repository: {
			name: 'koalalab/python-base',
			url: 'https://github.com/koalalab/python-base',
			branch: 'main',
			commit: 'a1b2c3d4e5f6',
			commit_message: 'Update Python base image with security patches'
		},
		build_environment: {
			os: 'Ubuntu 22.04',
			architecture: 'x86_64',
			build_tool: 'Docker Buildx',
			base_image: 'ubuntu:22.04'
		},
		security_attestations: [
			{
				type: 'SLSA',
				level: 'L3',
				status: 'verified',
				attestation_url: 'https://attestations.example.com/slsa-123'
			},
			{
				type: 'SPDX',
				status: 'verified',
				attestation_url: 'https://attestations.example.com/spdx-123'
			}
		],
		artifacts: [
			{
				name: 'python-base:latest',
				digest: 'sha256:abc123...',
				size: '45.2MB',
				platform: 'linux/amd64'
			},
			{
				name: 'python-base:3.11',
				digest: 'sha256:def456...',
				size: '45.2MB',
				platform: 'linux/amd64'
			}
		]
	}

	return (
		<div className="space-y-6">
			{/* Build Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Info className="h-5 w-5" />
						<span>Build Information</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-semibold mb-2">Build ID</h3>
							<div className="flex items-center space-x-2">
								<Hash className="h-4 w-4 text-muted-foreground" />
								<code className="bg-muted px-2 py-1 rounded text-sm">
									{provenanceData.build_id}
								</code>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Build Date</h3>
							<div className="flex items-center space-x-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm">
									{formatRelativeTime(provenanceData.build_date)}
								</span>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Build Duration</h3>
							<span className="text-sm">{provenanceData.build_duration}</span>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Build Status</h3>
							<Badge 
								variant="outline" 
								className="bg-green-100 text-green-800 border-green-200"
							>
								<CheckCircle className="h-3 w-3 mr-1" />
								{provenanceData.build_status}
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Repository Information */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<GitBranch className="h-5 w-5" />
						<span>Repository Information</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<h3 className="font-semibold mb-2">Repository</h3>
							<div className="flex items-center space-x-2">
								<code className="bg-muted px-2 py-1 rounded text-sm">
									{provenanceData.repository.name}
								</code>
								<Button variant="ghost" size="sm">
									<ExternalLink className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<h3 className="font-semibold mb-2">Branch</h3>
								<Badge variant="outline">{provenanceData.repository.branch}</Badge>
							</div>
							<div>
								<h3 className="font-semibold mb-2">Commit</h3>
								<div className="flex items-center space-x-2">
									<code className="bg-muted px-2 py-1 rounded text-sm">
										{provenanceData.repository.commit}
									</code>
									<Button variant="ghost" size="sm">
										<ExternalLink className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Commit Message</h3>
							<p className="text-sm text-muted-foreground">
								{provenanceData.repository.commit_message}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Build Environment */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<User className="h-5 w-5" />
						<span>Build Environment</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-semibold mb-2">Operating System</h3>
							<span className="text-sm">{provenanceData.build_environment.os}</span>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Architecture</h3>
							<span className="text-sm">{provenanceData.build_environment.architecture}</span>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Build Tool</h3>
							<span className="text-sm">{provenanceData.build_environment.build_tool}</span>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Base Image</h3>
							<code className="bg-muted px-2 py-1 rounded text-sm">
								{provenanceData.build_environment.base_image}
							</code>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Security Attestations */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Shield className="h-5 w-5" />
						<span>Security Attestations</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{provenanceData.security_attestations.map((attestation, index) => (
							<div key={index} className="flex items-center justify-between p-4 border rounded-lg">
								<div className="flex items-center space-x-3">
									<CheckCircle className="h-5 w-5 text-green-600" />
									<div>
										<div className="font-medium">{attestation.type}</div>
										{attestation.level && (
											<div className="text-sm text-muted-foreground">
												Level {attestation.level}
											</div>
										)}
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Badge 
										variant="outline" 
										className="bg-green-100 text-green-800 border-green-200"
									>
										{attestation.status}
									</Badge>
									<Button variant="ghost" size="sm">
										<ExternalLink className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Build Artifacts */}
			<Card>
				<CardHeader>
					<CardTitle>Build Artifacts</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{provenanceData.artifacts.map((artifact, index) => (
							<div key={index} className="flex items-center justify-between p-4 border rounded-lg">
								<div className="flex-1">
									<div className="font-medium">{artifact.name}</div>
									<div className="text-sm text-muted-foreground">
										{artifact.platform} • {artifact.size}
									</div>
									<div className="text-xs font-mono text-muted-foreground mt-1">
										{artifact.digest}
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Button variant="outline" size="sm">
										<Download className="h-4 w-4 mr-2" />
										Download
									</Button>
									<Button variant="ghost" size="sm">
										<ExternalLink className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
