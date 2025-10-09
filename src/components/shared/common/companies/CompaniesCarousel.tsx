import CompaniesScrollContainer from './CompaniesScrollContainer'
import { companies } from '@/data/companies'
import { Company } from '@/data/companies'

interface CompaniesCarouselProps {
  companies?: Company[]
  containerClassName?: string
}

export default function CompaniesCarousel({
  companies: propCompanies = companies,
  containerClassName = "py-4 sm:py-8"
}: CompaniesCarouselProps) {
  return (
    <div className={containerClassName}>
      <div className="relative w-full overflow-hidden">
        <CompaniesScrollContainer companies={propCompanies} />
      </div>
    </div>
  )
}
