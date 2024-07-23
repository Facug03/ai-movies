import MediaPage from '@/components/MediaPage'
import { getMovies, getMoviesGenres } from '@/services/getMovies'

export default async function Movies() {
  const [errorMovie, dataMovie] = await getMovies('popular')
  const [errorGenre, dataGenre] = await getMoviesGenres()

  if (errorGenre || errorMovie) {
    return <div>Error</div>
  }

  return (
    <MediaPage genres={dataGenre.genres} mediaContent={dataMovie} title='Movies' page='movies' dropdownTitle='All' />
  )
}
