import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Package } from '@/types/api'

interface PackageTableProps {
	packages: Package[]
}

export default function PackageTable({ packages }: PackageTableProps) {
    return (
        <div className="rounded-md border">
            {/* Desktop / tablet table */}
            <div className="hidden md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-content text-black">Package</TableHead>
                            <TableHead className="font-content text-black">Version</TableHead>
                            <TableHead className="font-content text-black">Repository</TableHead>
                            <TableHead className="font-content text-black">License</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {packages.map((pkg, index) => (
                            <TableRow key={index} className="font-content text-black hover:bg-[#E0FFF6]">
                                <TableCell>
                                    <span className="block truncate">{pkg.package}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="block truncate">{pkg.version}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="block truncate">{pkg.repository}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="block truncate">{pkg.license}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile list layout matching screenshot */}
            <div className="md:hidden font-content text-black">
                {/* Header row: Package | Version | ··· */}
                <div className="px-4 py-3">
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-7 text-[#394CA9] font-semibold">Package</div>
                        <div className="col-span-4 text-[#394CA9] font-semibold">Version</div>
                        <div className="col-span-1" />
                    </div>
                </div>
                {packages.map((pkg, index) => (
                    <div key={index} className="mx-4 mb-4 rounded-md border">
                        <div className="px-4 py-4 rounded-md hover:bg-[#E0FFF6]">
                            <div className="grid grid-cols-12 items-start gap-2">
                                <div className="col-span-7">
                                    <div className="text-base leading-snug truncate">{pkg.package}</div>
                                    <div className="mt-2 text-sm leading-snug truncate">{pkg.repository}</div>
                                </div>
                                <div className="col-span-4">
                                    <div className="text-base leading-snug truncate">{pkg.version}</div>
                                </div>
								<div className="col-span-1 flex justify-end">
									{/* Custom three-dots with slightly larger vertical gaps for mobile */}
									<svg
										className="h-12 w-4 text-gray-300"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<circle cx="12" cy="0" r="3" />
										<circle cx="12" cy="16" r="3" />
										<circle cx="12" cy="32" r="3" />
									</svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
