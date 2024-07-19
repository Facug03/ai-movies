'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'

import { Movie } from '@/types/movie'
import { imagesPath } from '@/utils/images'
import Img from '@/components/icons/Img'

interface Props {
  title: string
  movies: Movie[]
}

export default function SliderClient({ title, movies }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 'auto',
    dragFree: true,
    duration: 35,
    align: 'start',
    watchDrag: false
  })

  return (
    <section className='mb-7 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <h2 className='text-t3 font-bold text-w'>{title}</h2>

        <nav className='flex gap-6'>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollPrev()
            }}
            className='text-t3 font-bold text-primary'
          >
            {'<'}
          </button>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollNext()
            }}
            className='text-t3 font-bold text-primary'
          >
            {'>'}
          </button>
        </nav>
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {movies.map((movie) => (
            <article key={movie.id} className='mr-3 max-w-[9vw]'>
              <div className='relative mb-3 aspect-[2/3] h-auto w-[9vw] rounded-lg'>
                {movie.poster_path ? (
                  <Image
                    src={imagesPath(movie.poster_path, '220x330')}
                    fill
                    alt={`${movie.title} poster`}
                    className='rounded-lg object-contain'
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                    <Img styles='w-10 h-10 fill-b' />
                  </div>
                )}
              </div>
              <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-t7 font-bold text-w'>
                {movie.title}
              </h3>
              <p className='text-t8 text-w-75'>
                {movie.type} {movie?.release_date && `• ${movie.release_date.split('-')[0]}`}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
