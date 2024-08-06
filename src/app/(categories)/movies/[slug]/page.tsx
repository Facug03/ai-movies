import MediaPage from '@/app/(categories)/components/media-page'
import { getMovies, getMoviesGenres } from '@/services/movies'
import { slugify } from '@/utils/slugify'

export default async function MoviesGenres({ params: { slug } }: { params: { slug: string } }) {
  const splitSlug = slug.split('-')
  const [errorMovie, dataMovie, url] = await getMovies({
    type: 'popular',
    filters: {
      page: 1,
      genres: [Number(splitSlug[splitSlug.length - 1])],
      language: 'en-US'
    }
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
      dropdownTitle={dataGenre.genres.find((genre) => genre.id === Number(splitSlug[splitSlug.length - 1]))?.name}
      url={url}
    />
  )
}

export const dynamicParams = false

export async function generateStaticParams() {
  const [error, data] = await getMoviesGenres()

  if (error) {
    throw error
  }

  return data.genres.map((genre) => ({
    slug: `${slugify(genre.name)}-${genre.id}`
  }))
}
