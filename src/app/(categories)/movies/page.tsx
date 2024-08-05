import MediaPage from '@/app/(categories)/components/MediaPage'
import { getMovies, getMoviesGenres } from '@/services/movies'

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
