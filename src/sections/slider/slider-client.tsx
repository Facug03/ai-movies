'use client'

import useEmblaCarousel from 'embla-carousel-react'

import MediaItem from '@/components/media-item'
import SliderNav from '@/components/slider-nav'
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

        <SliderNav emblaApi={emblaApi} />
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
