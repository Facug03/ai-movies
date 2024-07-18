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
    watchDrag: false,
  })

  return (
    <section className='flex flex-col gap-3 mb-7'>
      <div className='flex justify-between items-center'>
        <h2 className='text-t3 text-w font-bold'>{title}</h2>

        <nav className='flex gap-6'>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollPrev()
            }}
            className='text-t3 text-primary font-bold'
          >
            {'<'}
          </button>
          <button
            onClick={() => {
              if (emblaApi) emblaApi.scrollNext()
            }}
            className='text-t3 text-primary font-bold'
          >
            {'>'}
          </button>
        </nav>
      </div>

      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {movies.map((movie) => (
            <article key={movie.id} className='max-w-[9vw] mr-3'>
              <div className='w-[9vw] h-auto rounded-lg mb-3 relative aspect-[2/3]'>
                {movie.poster_path ? (
                  <Image
                    src={imagesPath(movie.poster_path, '220x330')}
                    fill
                    alt={`${movie.title} poster`}
                    className='object-contain rounded-lg'
                  />
                ) : (
                  <div className='w-full h-full bg-w-50 rounded-lg flex justify-center items-center'>
                    <Img styles='w-10 h-10 fill-b' />
                  </div>
                )}
              </div>
              <h3 className='text-t7 text-w font-bold overflow-hidden whitespace-nowrap text-ellipsis'>
                {movie.title}
              </h3>
              <p className='text-t8 text-w-75'>
                Movie{' '}
                {movie?.release_date && `• ${movie.release_date.split('-')[0]}`}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
