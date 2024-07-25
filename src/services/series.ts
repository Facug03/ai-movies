import { Data } from '@/types/apiMovieDb/series'
import { MovieFilters } from '@/types/filters'
import { Genres } from '@/types/genres'
import { Media } from '@/types/media'
import { applyFilters } from '@/utils/applyFilters'
import { apis } from './api'

export const getSeries = async (
  type: keyof typeof apis.series,
  filters?: MovieFilters
): Promise<[null, Media[]] | [Error, null]> => {
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
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA5MmUxNzhjZmIzMjRhYTY1OGI3NGZmZDExMWY1MiIsIm5iZiI6MTcyMTE3NzY4MS4wMjEwNjIsInN1YiI6IjY2OTE1MTAzNjM2YzQyN2EwNzllMjZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rUzH7x6w74nmTOT5ioSc2_ZQ1795NK1BFsim7UeovVw'
      }
    })

    if (!response.ok) {
      throw new Error(`Unknown error: ${response.status}`)
    }

    const data = (await response.json()) as Data
    const formatData: Media[] = data.results.map((media) => {
      return {
        backdropPath: media.backdrop_path,
        id: media.id,
        originalLanguage: media.original_language,
        originalTitle: media.original_name,
        overview: media.overview,
        popularity: media.popularity,
        posterPath: media.poster_path,
        releaseDate: media.first_air_date,
        title: media.name,
        voteAverage: media.vote_average,
        voteCount: media.vote_count,
        type: 'Series'
      }
    })

    return [null, formatData]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}

export const getSeriesGenres = async (): Promise<[null, Genres] | [Error, null]> => {
  try {
    const response = await fetch(apis.series.genres, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA5MmUxNzhjZmIzMjRhYTY1OGI3NGZmZDExMWY1MiIsIm5iZiI6MTcyMTE3NzY4MS4wMjEwNjIsInN1YiI6IjY2OTE1MTAzNjM2YzQyN2EwNzllMjZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rUzH7x6w74nmTOT5ioSc2_ZQ1795NK1BFsim7UeovVw'
      }
    })

    if (!response.ok) {
      throw new Error(`Unknown error: ${response.status}`)
    }

    const data = (await response.json()) as Genres

    return [null, data]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}