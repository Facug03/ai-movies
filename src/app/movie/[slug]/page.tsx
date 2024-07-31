// import { unstable_cache } from 'next/cache'
import Image from 'next/image'

import SliderImages from '@/app/movie/sections/SliderImages'
import SliderVideos from '@/app/movie/sections/SliderVideos'
import Button from '@/components/Button'
import Ai from '@/components/icons/Ai'
import Heart from '@/components/icons/Heart'
import Img from '@/components/icons/Img'
import Like from '@/components/icons/Like'
import Star from '@/components/icons/Star'
import SliderClient from '@/sections/slider/SliderClient'
import { getMovie } from '@/services/series'
import { imagesPath } from '@/utils/images'
import { numberToHour } from '@/utils/numberToHour'

// const getCachedMovie = unstable_cache(
//   async (id: number) =>
//     getMovie(id, {
//       language: 'en'
//     }),
//   ['movie-detail']
// )

export default async function Movie({ params: { slug } }: { params: { slug: string } }) {
  const splitSlug = slug.split('-')
  // const [errorMovie, dataMovie] = await getCachedMovie(Number(splitSlug[0]))
  const [errorMovie, dataMovie] = await getMovie(Number(splitSlug[0]), {
    language: 'en'
  })

  if (errorMovie) {
    return <div>Error</div>
  }

  return (
    <>
      <section className='relative mb-16 mt-8 flex flex-col sm:mb-24 sm:mt-10'>
        <div className='absolute -top-20 left-[calc(50%-50vw)] -z-10 h-[calc(100%+48px+32px+64px)] w-screen sm:-top-[88px] sm:h-[calc(100%+48px+40px+96px)]'>
          <Image
            priority
            src={imagesPath(dataMovie.backdropPath, '1920x800')}
            fill
            alt={`${dataMovie.title} backgrop image`}
            className='mask-image-bg object-cover object-top opacity-25'
            sizes='100vw'
          />
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:gap-6'>
          <div className='relative mb-3 aspect-[2/3] h-auto w-[50vw] self-center rounded-lg shadow-xl sm:w-[22vw] sm:self-start md:w-[18vw] lg:w-[12vw]'>
            {dataMovie.posterPath ? (
              <Image
                src={imagesPath(dataMovie.posterPath, '300x450')}
                fill
                alt={`${dataMovie.title} poster`}
                className='rounded-lg object-contain'
              />
            ) : (
              <div className='flex h-full w-full items-center justify-center rounded-lg bg-w-50'>
                <Img styles='w-10 h-10 fill-b' />
              </div>
            )}
          </div>

          <div className='flex flex-col gap-2 sm:gap-3'>
            <div>
              <h1 className='text-m-t1 font-bold leading-tight text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t1'>
                {dataMovie.title}
              </h1>

              <span className='text-m-t7 font-bold text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
                {dataMovie?.releaseDate && `${dataMovie.releaseDate.split('-')[0]}`} • {numberToHour(dataMovie.runtime)}{' '}
                • {dataMovie.genres.map((genre) => genre.name).join(', ')}
              </span>
            </div>
            <div className='flex gap-6'>
              <div>
                <h3 className='text-m-t5 font-bold text-w sm:text-t5'>Rating</h3>
                <div className='flex gap-2'>
                  <Star styles='w-5 h-5 fill-primary' />
                  <p className='text-m-t6 font-bold text-w sm:text-t6'>{dataMovie.voteAverage.toFixed(1)}/10</p>
                </div>
              </div>

              <div>
                <h3 className='text-m-t5 font-bold text-w sm:text-t5'>Popularity</h3>
                <div className='flex gap-2'>
                  <Like styles='w-5 h-5 fill-primary' />
                  <p className='text-m-t6 font-bold text-w sm:text-t6'>{dataMovie.popularity.toFixed()}</p>
                </div>
              </div>
            </div>

            <p className='max-w-[40em] text-m-t7 text-w [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] sm:text-t7'>
              {dataMovie.overview}
            </p>

            <div className='flex flex-col gap-3 sm:flex-row'>
              <Button text='Add to favorites' type='primary' icon={<Heart styles='w-6 h-6 text-b' />} />
              <Button text='More info' type='secondary' icon={<Ai styles='w-7 h-7 fill-b stroke-b' />} />
            </div>
          </div>
        </div>
      </section>

      <div className='md:grid md:grid-cols-[6fr,1fr] md:gap-6'>
        <div className='overflow-hidden'>
          {dataMovie.videos.length > 0 && <SliderVideos videos={dataMovie.videos} />}

          {dataMovie.images.backdrops.length > 0 && <SliderImages images={dataMovie.images} />}

          {dataMovie.similar.length > 0 && <SliderClient title='Recomendations' movies={dataMovie.similar} />}
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-m-t3 font-bold text-w sm:text-t3'>Details</h2>

          {dataMovie.credits.crew.directors.length > 0 && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Director</h4>
              {dataMovie.credits.crew.directors.map((director) => (
                <p key={director.id} className='text-t7 text-w'>
                  {director.name}
                </p>
              ))}
            </div>
          )}

          {dataMovie.credits.crew.writers.length > 0 && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Screenplay</h4>
              {dataMovie.credits.crew.writers.map((writers) => (
                <p key={writers.id} className='text-t7 text-w'>
                  {writers.name}
                </p>
              ))}
            </div>
          )}

          {dataMovie.credits.cast.length > 0 && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Cast</h4>
              {dataMovie.credits.cast.map((cast) => (
                <p key={cast.id} className='text-t7 text-w'>
                  {cast.name}
                </p>
              ))}
            </div>
          )}

          {dataMovie?.releaseDate && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Release date</h4>
              <p className='text-t7 text-w'>{dataMovie.releaseDate}</p>
            </div>
          )}

          <div>
            <h4 className='text-t6 font-bold text-w'>Status</h4>
            <p className='text-t7 text-w'>{dataMovie.status}</p>
          </div>

          {dataMovie.budget > 0 && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Budget</h4>
              <p className='text-t7 text-w'>
                {dataMovie.budget.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumFractionDigits: 0
                })}
              </p>
            </div>
          )}

          {dataMovie.revenue > 0 && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Revenue</h4>
              <p className='text-t7 text-w'>
                {dataMovie.revenue.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumFractionDigits: 0
                })}
              </p>
            </div>
          )}

          <div>
            <h4 className='text-t6 font-bold text-w'>Origin country</h4>
            <p className='text-t7 text-w'>{dataMovie.originCountry}</p>
          </div>

          {dataMovie.voteCount > 0 && (
            <div>
              <h4 className='text-t6 font-bold text-w'>Vote count</h4>
              <p className='text-t7 text-w'>{dataMovie.voteCount}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
