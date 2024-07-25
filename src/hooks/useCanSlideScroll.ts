'use client'

import { UseEmblaCarouselType } from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export function useCanSlideScroll(emblaApi: UseEmblaCarouselType[1]) {
  const [canScroll, setCanScroll] = useState({
    scrollPrev: true,
    scrollNext: true
  })

  const updateCanScrollState = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return

    setCanScroll({
      scrollPrev: emblaApi.canScrollPrev(),
      scrollNext: emblaApi.canScrollNext()
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateCanScrollState(emblaApi)
    emblaApi.on('select', updateCanScrollState)
  }, [emblaApi, updateCanScrollState])

  return { canScroll }
}
