import MediaPage from '@/components/MediaPage'
import { getSeries, getSeriesGenres } from '@/services/getSeries'

export default async function Animes() {
  const [errorMovie, dataAnime] = await getSeries('anime')
  const [errorGenre, dataGenre] = await getSeriesGenres()

  if (errorGenre || errorMovie) {
    return <div>Error</div>
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataAnime}
      title='Animes'
      page='animes/series'
      dropdownTitle='All'
    />
  )
}
