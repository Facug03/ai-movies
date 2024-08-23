import { Hero, DetailsSection, ImagesSection } from '@/app/(details)/components/loaders'

export default function Loading() {
  return (
    <>
      <Hero />

      <div className='md:grid md:grid-cols-[6fr,1fr] md:gap-6'>
        <div>
          <ImagesSection />

          <ImagesSection />
        </div>

        <DetailsSection />
      </div>
    </>
  )
}
