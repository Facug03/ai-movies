import { Data } from '@/types/apiMovieDb/series'
import { apis } from './api'
import { Movie } from '@/types/movie'

export const getSeries = async (type: keyof typeof apis.series): Promise<[null, Movie[]] | [Error, null]> => {
  try {
    const response = await fetch(apis.series[type], {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA5MmUxNzhjZmIzMjRhYTY1OGI3NGZmZDExMWY1MiIsIm5iZiI6MTcyMTE3NzY4MS4wMjEwNjIsInN1YiI6IjY2OTE1MTAzNjM2YzQyN2EwNzllMjZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rUzH7x6w74nmTOT5ioSc2_ZQ1795NK1BFsim7UeovVw',
      },
    })
    const data = (await response.json()) as Data
    const formatData: Movie[] = data.results.map((movie) => {
      return {
        backdrop_path: movie.backdrop_path,
        id: movie.id,
        originalLanguage: movie.original_language,
        originalTitle: movie.original_name,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: movie.first_air_date,
        title: movie.name,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        type: 'Series',
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
