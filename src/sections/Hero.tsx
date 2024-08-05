import Image from 'next/image'

import Button from '@/components/Button'
import ButtonAssistant from '@/components/ButtonAssistant'
import Play from '@/components/icons/Play'
import { getMovies } from '@/services/movies'
import { imagesPath } from '@/utils/images'

export default async function Hero() {
  const [error, data] = await getMovies({
    type: 'nowPlaying'
  })

  if (error) {
    return <div>Error</div>
  }

  const [movie] = data

  return (
    <section className='relative mb-16 mt-8 flex flex-col sm:mb-28 sm:mt-10'>
      <div className='absolute -top-20 left-[calc(50%-50vw)] -z-10 h-[calc(100%+3rem+2rem+4rem)] w-screen sm:-top-[5.5rem] sm:h-[calc(100%+3rem+2.5rem+7rem)]'>
        <Image
          priority
          src={imagesPath(movie.backdropPath, '1920x800')}
          fill
          alt={`${movie.title} poster image`}
          className='mask-image-bg object-cover object-top opacity-25'
          sizes='100vw'
        />
      </div>

      <h1 className='text-m-t1 font-bold text-w sm:text-t1'>{movie.title}</h1>
      <p className='mb-3 line-clamp-3 max-w-[50em] text-m-t7 text-w sm:mb-7 sm:line-clamp-none sm:text-t7'>
        {movie.overview}
      </p>

      <div className='flex flex-col gap-3 sm:flex-row sm:gap-6'>
        <Button text='Watch trailer' type='primary' icon={<Play styles='w-5 h-5 fill-b stroke-b' />} />
        <ButtonAssistant type='info' title={movie.title} mediaType={movie.type ?? 'Movie'} />
      </div>
    </section>
  )
}
