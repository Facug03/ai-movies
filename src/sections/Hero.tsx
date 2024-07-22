import Image from 'next/image'

import Button from '@/components/Button'
import Ai from '@/components/icons/Ai'
import Play from '@/components/icons/Play'
import { getMovies } from '@/services/getMovies'
import { imagesPath } from '@/utils/images'

export default async function Hero() {
  const [error, data] = await getMovies('nowPlaying')

  if (error) {
    return <div>Error</div>
  }

  const [movie] = data

  return (
    <section className='mb-28 mt-10 flex flex-col'>
      <div className='absolute left-0 top-0 -z-10 h-2/5 w-screen'>
        <Image
          priority
          src={imagesPath(movie.backdropPath, '1920x800')}
          fill
          alt={`${movie.title} poster image`}
          className='mask-image-bg object-cover object-top opacity-25'
        />
      </div>

      <h1 className='text-t1 font-bold text-w'>{movie.title}</h1>
      <p className='mb-7 max-w-[50em] text-t7 text-w'>{movie.overview}</p>

      <div className='flex gap-6'>
        <Button text='Watch trailer' type='primary' icon={<Play styles='w-5 h-5 fill-b stroke-b' />} />
        <Button text='Information' type='secondary' icon={<Ai styles='w-7 h-7 fill-b stroke-b' />} />
      </div>
    </section>
  )
}
