'use client'

import LeftArrow from '@/components/icons/LeftArrow'
import { useCanSlideScroll } from '@/hooks/use-can-slide-scroll'
import { UseEmblaCarouselType } from 'embla-carousel-react'

interface Props {
  emblaApi: UseEmblaCarouselType[1]
}

export default function SliderNav({ emblaApi }: Props) {
  const { canScroll } = useCanSlideScroll(emblaApi)

  return (
    <>
      {(canScroll.scrollPrev || canScroll.scrollNext) && (
        <nav className='hidden md:flex md:gap-4'>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollPrev()
            }}
            className='enabled:hover:opacity-80 disabled:opacity-50'
            aria-label='Previous'
            disabled={!canScroll.scrollPrev}
          >
            <LeftArrow styles='w-9 h-9 stroke-primary' />
          </button>

          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollNext()
            }}
            className='enabled:hover:opacity-80 disabled:opacity-50'
            aria-label='Next'
            disabled={!canScroll.scrollNext}
          >
            <LeftArrow styles='w-9 h-9 stroke-primary rotate-180' />
          </button>
        </nav>
      )}
    </>
  )
}
