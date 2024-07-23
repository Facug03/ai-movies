import MediaPage from '@/components/MediaPage'
import { getMovies, getMoviesGenres } from '@/services/getMovies'

export default async function Animes() {
  const [errorMovie, dataAnime] = await getMovies('anime')
  const [errorGenre, dataGenre] = await getMoviesGenres()

  if (errorGenre || errorMovie) {
    return <div>Error</div>
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataAnime}
      title='Animes'
      page='animes/movies'
      dropdownTitle='All'
    />
  )
}
