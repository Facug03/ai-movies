import { DataMovieDetail } from '@/types/apiMovieDb/movieDetail'
import { Data } from '@/types/apiMovieDb/movies'
import { MovieFilters } from '@/types/filters'
import { Genres } from '@/types/genres'
import { Media } from '@/types/media'
import { MediaDetail } from '@/types/mediaDetail'
import { applyFilters } from '@/utils/applyFilters'
import { apis } from './api'

export const getMovies = async (
  type: keyof typeof apis.movies,
  filters?: MovieFilters
): Promise<[null, Media[]] | [Error, null]> => {
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

    return [null, formatData]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}

export const getMoviesGenres = async (): Promise<[null, Genres] | [Error, null]> => {
  try {
    const response = await fetch(apis.movies.genres, {
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

export const getMovie = async (
  id: number,
  filters?: Pick<MovieFilters, 'language'>
): Promise<[null, MediaDetail] | [Error, null]> => {
  try {
    const defaultFilters = {
      page: 1,
      language: 'en-US',
      genres: []
    }
    const url = applyFilters(
      `${apis.movies.detail}/${id}?append_to_response=videos,images,similar,credits`,
      filters ?? defaultFilters
    )

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzA5MmUxNzhjZmIzMjRhYTY1OGI3NGZmZDExMWY1MiIsIm5iZiI6MTcyMTE3NzY4MS4wMjEwNjIsInN1YiI6IjY2OTE1MTAzNjM2YzQyN2EwNzllMjZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rUzH7x6w74nmTOT5ioSc2_ZQ1795NK1BFsim7UeovVw'
      },
      next: {
        revalidate: 3600,
        tags: ['movie-detail']
      }
    })

    if (!response.ok) {
      throw new Error(`Unknown error: ${response.status}`)
    }

    const data = (await response.json()) as DataMovieDetail
    const formatData: MediaDetail = {
      backdropPath: data.backdrop_path,
      id: data.id,
      originalLanguage: data.original_language,
      originalTitle: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      budget: data.budget,
      revenue: data.revenue,
      runtime: data.runtime,
      status: data.status,
      title: data.title,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      genres: data.genres,
      type: 'Movie',
      releaseDate: data.release_date,
      originCountry: data.origin_country,
      posterPath: data.poster_path,
      images: {
        backdrops: data.images.backdrops.map((image) => {
          return {
            aspectRatio: image.aspect_ratio,
            height: image.height,
            iso_639_1: image.iso_639_1,
            filePath: image.file_path,
            voteAverage: image.vote_average,
            voteCount: image.vote_count,
            width: image.width
          }
        })
      },
      similar: data.similar.results.map((movie) => {
        return {
          backdropPath: movie.backdrop_path ?? '',
          id: movie.id,
          originalLanguage: movie.original_language,
          originalTitle: movie.original_title,
          overview: movie.overview,
          popularity: movie.popularity,
          releaseDate: movie.release_date,
          title: movie.title,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
          posterPath: movie.poster_path,
          type: 'Movie'
        }
      }),
      videos: data.videos.results.map((video) => {
        return {
          id: video.id,
          key: video.key,
          name: video.name,
          site: video.site,
          size: video.size,
          type: video.type,
          iso_3166_1: video.iso_3166_1,
          iso_639_1: video.iso_639_1,
          official: video.official,
          publishedAt: video.published_at
        }
      }),
      credits: {
        cast: data.credits.cast
          .map((cast) => {
            return {
              id: cast.id,
              name: cast.name,
              character: cast.character,
              profilePath: cast.profile_path,
              knownForDepartment: cast.known_for_department,
              originalName: cast.original_name,
              popularity: cast.popularity
            }
          })
          .slice(0, 3),
        crew: {
          directors: data.credits.crew
            .filter((crew) => crew.job === 'Director' || crew.job === 'Co-Director')
            .map((crew) => {
              return {
                department: crew.department,
                id: crew.id,
                job: crew.job,
                name: crew.name,
                originalName: crew.original_name,
                popularity: crew.popularity,
                profilePath: crew.profile_path,
                knownForDepartment: crew.known_for_department
              }
            })
            .slice(0, 3),
          writers: data.credits.crew
            .filter((crew) => crew.job === 'Writer' || crew.job === 'Screenplay')
            .map((crew) => {
              return {
                department: crew.department,
                id: crew.id,
                job: crew.job,
                name: crew.name,
                originalName: crew.original_name,
                popularity: crew.popularity,
                profilePath: crew.profile_path,
                knownForDepartment: crew.known_for_department
              }
            })
            .slice(0, 3)
        }
      }
    }

    return [null, formatData]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}
