import type { Metadata } from 'next'

import MediaPage from '@/app/(categories)/components/MediaPage'
import { getSeries, getSeriesGenres } from '@/services/series'

export const metadata: Metadata = {
  title: 'Series - aiMovies',
  description: 'Here you can find all series divided by genre, look for the best series on aiMovies.'
}

export default async function Series() {
  const [errorMovie, dataMovie, url] = await getSeries({ type: 'popular' })
  const [errorGenre, dataGenre] = await getSeriesGenres()

  if (errorGenre || errorMovie) {
    throw errorGenre ?? errorMovie
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataMovie}
      title='Series'
      page='series'
      dropdownTitle='All'
      url={url}
    />
  )
}
