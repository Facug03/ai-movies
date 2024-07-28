'use client'

import useEmblaCarousel from 'embla-carousel-react'

import LeftArrow from '@/components/icons/LeftArrow'
import MediaItem from '@/components/MediaItem'
import { Media } from '@/types/media'

interface Props {
  title: string
  movies: Media[]
}

export default function SliderClient({ title, movies }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 'auto',
    dragFree: true,
    align: 'start',
    duration: 22.5,
    breakpoints: {
      '(min-width: 768px)': {
        loop: true,
        dragFree: false,
        watchDrag: false
      }
    }
  })

  return (
    <section className='mb-7 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-m-t3 font-bold text-w sm:text-t3'>{title}</h2>

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
        <div className='flex'>
          {movies.map((movie) => (
            <MediaItem key={movie.id} media={movie} type='slider' />
          ))}
        </div>
      </div>
    </section>
  )
}
