import Image from 'next/image'

import { getMovies } from '@/services/getMovies'
import { imagesPath } from '@/utils/images'
import Button from '@/components/Button'
import Play from '@/components/icons/Play'
import Ai from '@/components/icons/Ai'

export default async function Hero() {
  const [error, data] = await getMovies('nowPlaying')

  if (error) {
    return <div>Error</div>
  }

  const [movie] = data

  return (
    <section className='flex flex-col mt-10 mb-28'>
      <div className='absolute h-2/5 w-screen top-0 left-0 -z-10'>
        <Image
          src={imagesPath(movie.backdrop_path, '1920x800')}
          fill
          alt={`${movie.title} poster image`}
          className='object-cover opacity-25 mask-image-bg object-top'
        />
      </div>

      <h1 className='text-t1 text-w font-bold'>{movie.title}</h1>
      <p className='text-t7 text-w max-w-[50em] mb-7'>{movie.overview}</p>

      <div className='flex gap-6'>
        <Button
          text='Watch trailer'
          type='primary'
          icon={<Play styles='w-5 h-5 fill-b stroke-b' />}
        />
        <Button
          text='Information'
          type='secondary'
          icon={<Ai styles='w-7 h-7 fill-b stroke-b' />}
        />
      </div>
    </section>
  )
}
