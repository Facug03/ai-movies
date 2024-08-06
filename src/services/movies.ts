import { config } from '@/config'
import { Data } from '@/types/api-movie-db/movies'
import { MovieFilters } from '@/types/filters'
import { Genres } from '@/types/genres'
import { Media } from '@/types/media'
import { applyFilters } from '@/utils/apply-filters'
import { formatMovies } from '@/utils/format'
import { ApiResponse, apis } from './api'

export const getMovies = async ({
  type,
  filters
}: {
  type: keyof typeof apis.movies
  filters?: MovieFilters
}): Promise<ApiResponse<Media[]>> => {
  try {
    const defaultFilters = {
      page: 1,
      language: 'en-US',
      genres: []
    }
    const url = applyFilters(apis.movies[type], filters ?? defaultFilters)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.MOVIE_API_KEY}`
      },
      next: { revalidate: 43200 }
    })

    if (!response.ok) {
      throw new Error(`Unknown error: ${response.status}`)
    }

    const data = (await response.json()) as Data
    const formatData: Media[] = formatMovies(data.results)

    return [null, formatData, url]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}

export const getMoviesGenres = async (): Promise<ApiResponse<Genres>> => {
  try {
    const response = await fetch(apis.movies.genres, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${config.MOVIE_API_KEY}`
      }
    })

    if (!response.ok) {
      throw new Error(`Unknown error: ${response.status}`)
    }

    const data = (await response.json()) as Genres

    return [null, data, apis.movies.genres]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}
