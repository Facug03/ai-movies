import { PaginatedResponse } from '@/app/(categories)/types/paginatedResponse'
import { Data } from '@/types/apiMovieDb/movies'
import { Media } from '@/types/media'

export const getMoviesPaginated = async (url: string): Promise<PaginatedResponse> => {
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
      originalTitle: media.original_title,
      overview: media.overview,
      popularity: media.popularity,
      posterPath: media.poster_path,
      releaseDate: media.release_date,
      title: media.title,
      voteAverage: media.vote_average,
      voteCount: media.vote_count,
      type: 'Movie'
    }
  })

  return {
    page: data.page,
    totalPages: data.total_pages,
    totalResults: data.total_results,
    results: formatData
  }
}
