import { Metadata } from 'next'

import MediaPage from '@/app/(categories)/components/media-page'
import { getMovies, getMoviesGenres } from '@/services/movies'

export const metadata: Metadata = {
  title: 'Anime movies - aiMovies',
  description: 'Here you can find all movies divided by genre, look for the best movies on aiMovies.'
}

export default async function AnimesMovies() {
  const [errorMovie, dataAnime, url] = await getMovies({
    type: 'anime',
    filters: {
      page: 1
    }
  })
  const [errorGenre, dataGenre] = await getMoviesGenres()

  if (errorGenre || errorMovie) {
    throw errorGenre ?? errorMovie
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataAnime}
      title='Animes'
      page='animes/movies'
      dropdownTitle='All'
      url={url}
    />
  )
}
