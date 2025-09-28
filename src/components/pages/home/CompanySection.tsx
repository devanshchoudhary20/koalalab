import { CompaniesCarousel } from '@/components/shared/common'

const CompanySection = () => {
  return (
    <div className='bg-[#F7F7F7] sm:bg-white'>
      <div className="text-center text-gradient-fill-blueText text-xs sm:text-sm py-8">
        <p>KoalaLabs is trusted by 5000+ companies of all sizes</p>
      </div>
      <CompaniesCarousel />
    </div>
  )
}

export default CompanySection