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
        <h1 className='text-t2 text-w font-bold mb-2'>Explore</h1>
        <div className='flex flex-wrap gap-4'>
          {data.map((movie) => (
            <article key={movie.id} className='max-w-[9vw]'>
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
                {movie.type}{' '}
                {movie?.release_date && `• ${movie.release_date.split('-')[0]}`}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
