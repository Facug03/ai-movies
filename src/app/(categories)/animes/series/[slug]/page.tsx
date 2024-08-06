import { Metadata } from 'next'

import MediaPage from '@/app/(categories)/components/media-page'
import { getSeries, getSeriesGenres } from '@/services/series'
import { slugify } from '@/utils/slugify'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
  const splitSlug = slug.split('-')
  const [errorGenre, dataGenre] = await getSeriesGenres()

  if (errorGenre) {
    throw errorGenre
  }

  const genre = dataGenre.genres.find((genre) => genre.id === Number(splitSlug[splitSlug.length - 1]))?.name

  return {
    title: `${genre} anime series - AiMovies`,
    description: `Find all anime series of ${genre}.`
  }
}

export default async function AnimesSeriesGenres({ params: { slug } }: Props) {
  const splitSlug = slug.split('-')
  const [errorMovie, dataMovie, url] = await getSeries({
    type: 'anime',
    filters: {
      page: 1,
      genres: [16, Number(splitSlug[splitSlug.length - 1])],
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
      title='Animes'
      page='animes/series'
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
