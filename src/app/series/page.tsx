import type { Metadata } from 'next'

import MediaPage from '@/components/MediaPage'
import { getSeries, getSeriesGenres } from '@/services/getSeries'

export const metadata: Metadata = {
  title: 'Series - aiMovies',
  description: 'Here you can find all series divided by genre, look for the best series on aiMovies.'
}

export default async function Series() {
  const [errorMovie, dataMovie] = await getSeries('popular')
  const [errorGenre, dataGenre] = await getSeriesGenres()

  if (errorGenre || errorMovie) {
    return <div>Error</div>
  }

  return (
    <MediaPage genres={dataGenre.genres} mediaContent={dataMovie} title='Series' page='series' dropdownTitle='All' />
  )
}
