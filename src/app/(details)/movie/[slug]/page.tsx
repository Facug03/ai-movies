// import { unstable_cache } from 'next/cache'

import { getMovie } from '@/app/(details)/movie/services/movie'
import Hero from '@/app/(details)/sections/hero'
import SliderImages from '@/app/(details)/sections/slider-images'
import SliderVideos from '@/app/(details)/sections/slider-videos'
import SliderClient from '@/sections/slider/slider-client'
import MediaInfo from '../../components/media-info'

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
    throw errorMovie
  }

  return (
    <>
      <Hero movieDetail={dataMovie} />

      <div className='md:grid md:grid-cols-[6fr,1fr] md:gap-6'>
        <div className='overflow-hidden'>
          {dataMovie.videos.length > 0 && <SliderVideos videos={dataMovie.videos} />}

          {dataMovie.images.backdrops.length > 0 && <SliderImages images={dataMovie.images} />}

          {dataMovie.similar.length > 0 && <SliderClient title='Recomendations' movies={dataMovie.similar} />}
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-m-t3 font-bold text-w sm:text-t3'>Details</h2>

          {dataMovie.credits.crew.directors.length > 0 && (
            <MediaInfo title='Director' info={dataMovie.credits.crew.directors.map((director) => director.name)} />
          )}

          {dataMovie.credits.crew.writers.length > 0 && (
            <MediaInfo title='Screenplay' info={dataMovie.credits.crew.writers.map((writer) => writer.name)} />
          )}

          {dataMovie.credits.cast.length > 0 && (
            <MediaInfo title='Cast' info={dataMovie.credits.cast.map((cast) => cast.name)} />
          )}

          {dataMovie?.releaseDate && (
            <MediaInfo title='Release date' info={[new Date(dataMovie.releaseDate).toLocaleDateString()]} />
          )}

          <MediaInfo title='Status' info={[dataMovie.status]} />

          {dataMovie.budget > 0 && (
            <MediaInfo
              title='Budget'
              info={[
                dataMovie.budget.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumFractionDigits: 0
                })
              ]}
            />
          )}

          {dataMovie.revenue > 0 && (
            <MediaInfo
              title='Revenue'
              info={[
                dataMovie.revenue.toLocaleString('en-US', {
                  currency: 'USD',
                  style: 'currency',
                  maximumFractionDigits: 0
                })
              ]}
            />
          )}

          <MediaInfo title='Origin country' info={dataMovie.originCountry} />

          {dataMovie.voteCount > 0 && <MediaInfo title='Vote count' info={[dataMovie.voteCount.toString()]} />}
        </div>
      </div>
    </>
  )
}
