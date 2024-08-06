import { Metadata } from 'next'

import MediaPage from '@/app/(categories)/components/media-page'
import { getMovies, getMoviesGenres } from '@/services/movies'

export const metadata: Metadata = {
  title: 'Movies - aiMovies',
  description: 'Here you can find all movies divided by genre, look for the best series on aiMovies.'
}

export default async function Movies() {
  const [errorMovie, dataMovie, url] = await getMovies({
    type: 'popular'
  })
  const [errorGenre, dataGenre] = await getMoviesGenres()

  if (errorGenre || errorMovie) {
    throw errorGenre ?? errorMovie
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataMovie}
      title='Movies'
      page='movies'
      dropdownTitle='All'
      url={url}
    />
  )
}
