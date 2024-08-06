import MediaPage from '@/app/(categories)/components/media-page'
import { getSeries, getSeriesGenres } from '@/services/series'
import { slugify } from '@/utils/slugify'

export default async function SeriesGenres({ params: { slug } }: { params: { slug: string } }) {
  const splitSlug = slug.split('-')
  const [errorMovie, dataMovie, url] = await getSeries({
    type: 'popular',
    filters: {
      page: 1,
      genres: [Number(splitSlug[splitSlug.length - 1])],
      language: 'en-US'
    }
  })
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
      dropdownTitle={dataGenre.genres.find((genre) => genre.id === Number(splitSlug[splitSlug.length - 1]))?.name}
      url={url}
    />
  )
}

export const dynamicParams = false

export async function generateStaticParams() {
  const [error, data] = await getSeriesGenres()

  if (error) {
    throw error
  }

  return data.genres.map((genre) => ({
    slug: `${slugify(genre.name)}-${genre.id}`
  }))
}
