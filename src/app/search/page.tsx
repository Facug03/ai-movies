import Image from 'next/image'

import { getAll } from '@/services/getAll'
import { imagesPath } from '@/utils/images'
import SearchForm from '@/components/SearchForm'
import Img from '@/components/icons/Img'

export default async function Search() {
  const [error, data] = await getAll('trending')

  if (error) {
    return <div>Error</div>
  }

  return (
    <>
      <SearchForm />

      <section id='explore-section'>
        <h1 className='mb-2 text-t2 font-bold text-w'>Explore</h1>
        <div className='flex flex-wrap gap-4'>
          {data.map((movie) => (
            <article key={movie.id} className='max-w-[9vw]'>
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
      </section>
    </>
  )
}
