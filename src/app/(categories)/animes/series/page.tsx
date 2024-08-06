import MediaPage from '@/app/(categories)/components/media-page'
import { getSeries, getSeriesGenres } from '@/services/series'

export default async function AnimesSeries() {
  const [errorMovie, dataAnime, url] = await getSeries({
    type: 'anime'
  })
  const [errorGenre, dataGenre] = await getSeriesGenres()

  if (errorGenre || errorMovie) {
    throw errorGenre ?? errorMovie
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataAnime}
      title='Animes'
      page='animes/series'
      dropdownTitle='All'
      url={url}
    />
  )
}
