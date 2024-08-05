// import { unstable_cache } from 'next/cache'

import Hero from '@/app/(details)/sections/Hero'
import SliderImages from '@/app/(details)/sections/SliderImages'
import SliderVideos from '@/app/(details)/sections/SliderVideos'
import { getSeries } from '@/app/(details)/tv/services/series'
import SliderClient from '@/sections/slider/SliderClient'
import MediaInfo from '../../components/MediaInfo'

// const getCachedMovie = unstable_cache(
//   async (id: number) =>
//     getMovie(id, {
//       language: 'en'
//     }),
//   ['movie-detail']
// )

export default async function Series({ params: { slug } }: { params: { slug: string } }) {
  const splitSlug = slug.split('-')
  // const [errorMovie, dataSeries] = await getCachedMovie(Number(splitSlug[0]))
  const [errorSeries, dataSeries] = await getSeries(Number(splitSlug[0]), {
    language: 'en'
  })

  if (errorSeries) {
    throw errorSeries
  }

  return (
    <>
      <Hero seriesDetail={dataSeries} />

      <div className='md:grid md:grid-cols-[6fr,1fr] md:gap-6'>
        <div className='overflow-hidden'>
          {dataSeries.videos.length > 0 && <SliderVideos videos={dataSeries.videos} />}

          {dataSeries.images.backdrops.length > 0 && <SliderImages images={dataSeries.images} />}

          {dataSeries.similar.length > 0 && <SliderClient title='Recomendations' movies={dataSeries.similar} />}
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-m-t3 font-bold text-w sm:text-t3'>Details</h2>

          {dataSeries.credits.crew.creators.length > 0 && (
            <MediaInfo title='Creator' info={dataSeries.credits.crew.creators.map((creator) => creator.name)} />
          )}

          {dataSeries.credits.cast.length > 0 && (
            <MediaInfo title='Cast' info={dataSeries.credits.cast.map((cast) => cast.name)} />
          )}

          <MediaInfo title='Status' info={[dataSeries.status]} />

          {dataSeries?.releaseDate && (
            <MediaInfo title='Release date' info={[new Date(dataSeries.releaseDate).toLocaleDateString()]} />
          )}

          {dataSeries?.lastAirDate && (
            <MediaInfo title='Last air date' info={[new Date(dataSeries.lastAirDate).toLocaleDateString()]} />
          )}

          <MediaInfo title='Seasons' info={[dataSeries.numberOfSeasons.toString()]} />

          <MediaInfo title='Episodes' info={[dataSeries.numberOfEpisodes.toString()]} />

          <MediaInfo title='Origin country' info={dataSeries.originCountry} />

          {dataSeries.voteCount > 0 && <MediaInfo title='Vote count' info={[dataSeries.voteCount.toString()]} />}
        </div>
      </div>
    </>
  )
}
