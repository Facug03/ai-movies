'use client'

import { YouTubeEmbed } from '@next/third-parties/google'
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

import Img from '@/components/icons/Img'
import LeftArrow from '@/components/icons/LeftArrow'
import { Videos } from '@/types/mediaDetail'

interface Props {
  videos: Videos[]
}

export default function SliderVideos({ videos }: Props) {
  const [slidesInView, setSlidesInView] = useState<number[]>([])
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 'auto',
    dragFree: true,
    duration: 35,
    align: 'start',
    watchDrag: true,
    breakpoints: {
      '(min-width: 768px)': {
        watchDrag: false,
        loop: true
      }
    }
  })

  const updateSlidesInView = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    if (!emblaApi) return

    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView)
      }
      const inView = emblaApi.slidesInView().filter((index) => !slidesInView.includes(index))
      return slidesInView.concat(inView)
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateSlidesInView(emblaApi)
    emblaApi.on('slidesInView', updateSlidesInView)
    emblaApi.on('reInit', updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

  console.log(slidesInView)

  return (
    <section className='mb-7 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-m-t3 font-bold text-w sm:text-t3'>Videos</h2>

        <nav className='hidden md:flex md:gap-4'>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollPrev()
            }}
            className='font-bold'
            aria-label='Previous'
          >
            <LeftArrow styles='w-9 h-9 stroke-primary hover:opacity-80' />
          </button>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollNext()
            }}
            className='font-bold'
            aria-label='Next'
          >
            <LeftArrow styles='w-9 h-9 stroke-primary rotate-180 hover:opacity-80' />
          </button>
        </nav>
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-2'>
          {videos.map((video, index) => {
            if (index + 1 > slidesInView.length) {
              return (
                <div
                  key={video.id}
                  className='aspect-video h-auto min-w-[70%] max-w-[70%] sm:min-w-[40%] sm:max-w-[40%] lg:min-w-[28%] lg:max-w-[28%]'
                >
                  <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                    <Img styles='w-10 h-10 fill-b' />
                  </div>
                </div>
              )
            }

            return (
              <div
                key={video.id}
                className='aspect-video h-auto min-w-[70%] max-w-[70%] sm:min-w-[40%] sm:max-w-[40%] lg:min-w-[28%] lg:max-w-[28%]'
              >
                <YouTubeEmbed
                  videoid={video.key}
                  playlabel='Play'
                  style='width: 100%; height: 100%; border-radius: 8px;'
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
