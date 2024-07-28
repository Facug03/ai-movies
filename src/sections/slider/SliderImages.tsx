'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useState } from 'react'

import LeftArrow from '@/components/icons/LeftArrow'
import { useCanSlideScroll } from '@/hooks/useCanSlideScroll'
import { Images } from '@/types/mediaDetail'
import { imagesPath } from '@/utils/images'
import SliderScreen from './SliderScreen'

interface Props {
  images: Images
}

export default function SliderImages({ images }: Props) {
  const [slideIndex, setSlideIndex] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 'auto',
    dragFree: true,
    duration: 22.5,
    align: 'start',
    breakpoints: {
      '(min-width: 768px)': {
        watchDrag: false,
        loop: true
      }
    }
  })
  const { canScroll } = useCanSlideScroll(emblaApi)

  return (
    <section className='mb-7 flex flex-col gap-3'>
      {slideIndex && (
        <SliderScreen onClose={() => setSlideIndex(null)} startIndex={slideIndex - 1}>
          {images.backdrops.map((image) => (
            <div
              key={image.filePath}
              className={`${images.backdrops.length > 1 ? 'mx-[calc(100vw-97.5vw)] sm:mx-[calc(100vw-20vw)]' : 'ml-[calc(100vw-97.5vw)]'} embla-slide relative aspect-[16/9] h-auto w-[95vw] max-w-[95vw] sm:w-[60vw] sm:max-w-[60vw]`}
            >
              <Image
                src={imagesPath(image.filePath, 1280)}
                fill
                alt='background images'
                className='rounded-lg object-cover'
              />
            </div>
          ))}
        </SliderScreen>
      )}
      <div className='flex items-center justify-between'>
        <h2 className='text-m-t3 font-bold text-w sm:text-t3'>Images</h2>

        {(canScroll.scrollPrev || canScroll.scrollNext) && (
          <nav className='hidden md:flex md:gap-4'>
            <button
              onClick={() => {
                if (emblaApi) emblaApi.scrollPrev()
              }}
              className='font-bold enabled:hover:opacity-80 disabled:opacity-50'
              aria-label='Previous'
              disabled={!canScroll.scrollPrev}
            >
              <LeftArrow styles='w-9 h-9 stroke-primary' />
            </button>

            <button
              onClick={() => {
                if (emblaApi) emblaApi.scrollNext()
              }}
              className='font-bold enabled:hover:opacity-80 disabled:opacity-50'
              aria-label='Next'
              disabled={!canScroll.scrollNext}
            >
              <LeftArrow styles='w-9 h-9 stroke-primary rotate-180' />
            </button>
          </nav>
        )}
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {images.backdrops.map((image, index) => (
            <div
              key={image.filePath}
              className='relative mr-2 aspect-video h-auto flex-[0_0_70%] cursor-pointer sm:flex-[0_0_40%] lg:flex-[0_0_28%]'
              onClick={() => setSlideIndex(index + 1)}
            >
              <Image
                src={imagesPath(image.filePath, '533x300')}
                fill
                alt='background images'
                className='rounded-lg object-contain'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
