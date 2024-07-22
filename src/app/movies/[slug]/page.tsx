import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/Button'
import { getMovies, getMoviesGenres } from '@/services/getMovies'
import { imagesPath } from '@/utils/images'
import Img from '@/components/icons/Img'
import { slugify } from '@/utils/slugify'

export default async function MoviesGenres({ params: { slug } }: { params: { slug: string } }) {
  const splitSlug = slug.split('-')
  const [errorMovie, dataMovie] = await getMovies('popular', {
    page: 1,
    genres: [Number(splitSlug[splitSlug.length - 1])],
    language: 'en-US'
  })
  const [errorGenre, dataGenre] = await getMoviesGenres()

  if (errorGenre || errorMovie) {
    return <div>Error</div>
  }

  return (
    <>
      <h1 className='mb-6 mt-9 text-center text-t1 font-bold text-primary'>Movies</h1>

      <nav className='mb-6 flex flex-wrap gap-2'>
        <Button text='All' type='primary' />

        {dataGenre.genres.map((genre) => (
          <Link
            key={genre.id}
            href={`/movies/${slugify(genre.name)}-${genre.id}`}
            className='border-1 flex w-fit items-center justify-between gap-3 rounded-lg border-[1px] px-8 py-2 font-bold text-w'
          >
            {genre.name}
          </Link>
        ))}
      </nav>

      <div className='flex flex-wrap gap-4'>
        {dataMovie.map((movie) => (
          <article key={movie.id} className='max-w-[9vw] animate-fade-in'>
            <div className='relative mb-3 aspect-[2/3] h-auto w-[9vw] rounded-lg'>
              {movie.posterPath ? (
                <Image
                  src={imagesPath(movie.posterPath, '220x330')}
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
            <h3 className='overflow-hidden text-ellipsis whitespace-nowrap text-t7 font-bold text-w'>{movie.title}</h3>
            <p className='text-t8 text-w-75'>
              {movie.type} {movie?.releaseDate && `• ${movie.releaseDate.split('-')[0]}`}
            </p>
          </article>
        ))}
      </div>
    </>
  )
}

export const dinamicParams = false

export async function generateStaticParams() {
  const [error, data] = await getMoviesGenres()

  if (error) {
    throw error
  }

  return data.genres.map((genre) => ({
    slug: `${slugify(genre.name)}-${genre.id}`
  }))
}