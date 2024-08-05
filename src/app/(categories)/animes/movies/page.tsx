import MediaPage from '@/app/(categories)/components/MediaPage'
import { getMovies, getMoviesGenres } from '@/services/movies'

export default async function AnimesSeries() {
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
