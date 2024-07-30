import MediaPage from '@/app/(categories)/components/MediaPage'
import { getMovies, getMoviesGenres } from '@/services/movies'
import { slugify } from '@/utils/slugify'

export default async function MoviesGenres({ params: { slug } }: { params: { slug: string } }) {
  const splitSlug = slug.split('-')
  const [errorMovie, dataMovie] = await getMovies('popular', {
    page: 1,
    genres: [Number(splitSlug[splitSlug.length - 1])],
    language: 'en-US'
  })
  const [errorGenre, dataGenre] = await getMoviesGenres()

  if (errorGenre || errorMovie) {
    return <div>Error</div>
  }

  return (
    <MediaPage
      genres={dataGenre.genres}
      mediaContent={dataMovie}
      title='Movies'
      page='movies'
      dropdownTitle={dataGenre.genres.find((genre) => genre.id === Number(splitSlug[splitSlug.length - 1]))?.name}
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
