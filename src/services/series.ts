import { Data } from '@/types/api-movie-db/series'
import { MovieFilters } from '@/types/filters'
import { Genres } from '@/types/genres'
import { Media } from '@/types/media'
import { applyFilters } from '@/utils/apply-filters'
import { ApiResponse, apis } from './api'
import { formatSeries } from '@/utils/format'
import { config } from '@/config'

export const getSeries = async ({
  type,
  filters
}: {
  type: keyof typeof apis.series
  filters?: MovieFilters
}): Promise<ApiResponse<Media[]>> => {
  try {
    const defaultFilters = {
      page: 1,
      language: 'en-US',
      genres: []
    }
    const url = applyFilters(apis.series[type], filters ?? defaultFilters)

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
    const formatData: Media[] = formatSeries(data.results)

    return [null, formatData, url]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}

export const getSeriesGenres = async (): Promise<ApiResponse<Genres>> => {
  try {
    const response = await fetch(apis.series.genres, {
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

    return [null, data, apis.series.genres]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}
