import { Skeleton } from '@/components/skeleton'

export function ImagesSection() {
  return (
    <div className='mb-7 flex flex-col gap-3'>
      <Skeleton className='h-7 w-24' />

      <div className='overflow-hidden'>
        <div className='flex space-x-2'>
          <div className='group relative aspect-video flex-[0_0_70%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]'>
            <Skeleton className='h-full w-full' />
          </div>
          <div className='group relative aspect-video flex-[0_0_70%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]'>
            <Skeleton className='h-full w-full' />
          </div>
          <div className='group relative aspect-video flex-[0_0_70%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]'>
            <Skeleton className='h-full w-full' />
          </div>
          <div className='group relative aspect-video flex-[0_0_70%] sm:flex-[0_0_40%] lg:flex-[0_0_28%]'>
            <Skeleton className='h-full w-full' />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DetailsSection() {
  return (
    <div className='flex flex-col gap-3'>
      <Skeleton className='h-6 w-40' />
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
      </div>
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
      </div>
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
        <Skeleton className='mt-2 h-4 w-36' />
        <Skeleton className='mt-2 h-4 w-36' />
      </div>
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
      </div>
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
      </div>
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
      </div>
      <div>
        <Skeleton className='mb-2 h-5 w-24' />
        <Skeleton className='h-4 w-36' />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <div className='relative mb-16 mt-8 flex animate-pulse flex-col sm:mb-24 sm:mt-10'>
      <div
        className='absolute -top-20 left-[calc(50%-50vw)] -z-10 h-[calc(100%+48px+32px+64px)] w-screen sm:-top-[88px]
          sm:h-[calc(100%+48px+40px+96px)]'
      />
      <div className='flex flex-col gap-3 sm:flex-row sm:gap-6'>
        <Skeleton
          className='relative mb-3 aspect-[2/3] h-auto w-[50vw] self-center rounded-lg shadow-xl sm:w-[22vw] sm:self-start md:w-[18vw]
            lg:w-[12vw]'
        />

        <div className='flex flex-1 flex-col gap-2 sm:gap-3'>
          <Skeleton className='h-8 w-1/2' />
          <Skeleton className='h-4 w-1/3' />

          <div className='flex gap-6'>
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-4 w-16' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-4 w-8' />
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-4 w-16' />
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-4 w-8' />
              </div>
            </div>
          </div>

          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-1/2' />

          <div className='flex flex-col gap-3 sm:flex-row'>
            <Skeleton className='h-10 w-36 rounded-lg' />
            <Skeleton className='h-10 w-28 rounded-lg' />
          </div>
        </div>
      </div>
    </div>
  )
}
