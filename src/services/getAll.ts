import { Data } from '@/types/apiMovieDb/all'
import { Movie } from '@/types/movie'
import { SearchResults } from '@/types/search'
import { apis } from './api'

export const getAll = async (type: keyof typeof apis.all): Promise<[null, Movie[]] | [Error, null]> => {
  try {
    const response = await fetch(apis.all[type], {
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
    const formatData: Movie[] = data.results.map((movie) => {
      return {
        backdropPath: movie.backdrop_path,
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title ? movie.original_title : movie.original_name ?? '',
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date ? movie.release_date : movie.first_air_date ?? '',
        title: movie.title ? movie.title : movie.name ?? '',
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        type: movie.media_type === 'tv' ? 'Series' : 'Movie'
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

export const searchAll = async (url: string): Promise<SearchResults> => {
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
  const formatData: Movie[] = data.results
    .filter((movie) => movie.media_type !== 'person')
    .map((movie) => {
      return {
        backdropPath: movie.backdrop_path,
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title ? movie.original_title : movie.original_name ?? '',
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date ? movie.release_date : movie.first_air_date ?? '',
        title: movie.title ? movie.title : movie.name ?? '',
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        type: movie.media_type === 'tv' ? 'Series' : 'Movie'
      }
    })

  return {
    page: data.page,
    data: formatData,
    totalPages: data.total_pages,
    totalResults: data.total_results
  }
}
