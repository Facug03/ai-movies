'use client'

import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import { PropsWithChildren, useCallback, useEffect, useState } from 'react'

import Close from '@/components/icons/Close'
import LeftArrow from '@/components/icons/LeftArrow'
import { useCanSlideScroll } from '@/hooks/useCanSlideScroll'

interface Props extends PropsWithChildren {
  onClose: () => void
  startIndex: number | null
}

export default function SliderScreen({ children, onClose, startIndex }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: startIndex ?? 0,
    loop: true,
    duration: 22.5,
    slidesToScroll: 1,
    align: 'center'
  })
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)
  const { canScroll } = useCanSlideScroll(emblaApi)

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('reInit', () => {
      emblaApi.scrollTo(startIndex ?? 0, true)
    })
  }, [emblaApi, startIndex])

  return (
    <div
      className='aling fixed inset-0 z-50 flex h-screen w-screen flex-col justify-center gap-3 overflow-hidden backdrop-brightness-50
        sm:flex-row sm:items-center sm:justify-between'
    >
      <div className='fixed left-6 top-6'>
        <span className='text-primary'>
          {selectedSnap + 1} / {snapCount}
        </span>
      </div>

      <button className='fixed right-6 top-6' onClick={onClose}>
        <Close styles='w-7 h-7 fill-primary' />
      </button>

      <button
        onClick={() => {
          if (emblaApi) emblaApi.scrollPrev()
        }}
        className='self-start font-bold enabled:hover:opacity-80 disabled:opacity-50 sm:self-auto'
        aria-label='Previous'
        disabled={!canScroll.scrollPrev}
      >
        <LeftArrow styles='w-10 h-10 stroke-primary' />
      </button>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>{children}</div>
      </div>

      <button
        onClick={() => {
          if (emblaApi) emblaApi.scrollNext()
        }}
        className='self-end font-bold enabled:hover:opacity-80 disabled:opacity-50 sm:self-auto'
        aria-label='Next'
        disabled={!canScroll.scrollNext}
      >
        <LeftArrow styles='w-10 h-10 stroke-primary rotate-180' />
      </button>
    </div>
  )
}

function useSelectedSnapDisplay(emblaApi: UseEmblaCarouselType[1]): {
  selectedSnap: number
  snapCount: number
} {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return

    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return {
    selectedSnap,
    snapCount
  }
}
