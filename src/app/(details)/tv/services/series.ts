import { ApiResponse, apis } from '@/services/api'
import { DataSeriesDetail } from '@/types/apiMovieDb/seriesDetail'
import { MovieFilters } from '@/types/filters'
import { SeriesDetail } from '@/types/seriesDetail'
import { applyFilters } from '@/utils/applyFilters'

export const getSeries = async (
  id: number,
  filters?: Pick<MovieFilters, 'language'>
): Promise<ApiResponse<SeriesDetail>> => {
  try {
    const defaultFilters = {
      page: 1,
      language: 'en-US',
      genres: []
    }
    const url = applyFilters(
      `${apis.series.detail}/${id}?append_to_response=videos,images,similar,credits`,
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
        tags: ['series-detail']
      }
    })

    if (!response.ok) {
      throw new Error(`Unknown error: ${response.status}`)
    }

    const data = (await response.json()) as DataSeriesDetail
    const formatData: SeriesDetail = {
      id: data.id,
      backdropPath: data.backdrop_path,
      originalLanguage: data.original_language,
      originalTitle: data.original_name,
      overview: data.overview,
      lastAirDate: data.last_air_date,
      numberOfEpisodes: data.number_of_episodes,
      numberOfSeasons: data.number_of_seasons,
      popularity: data.popularity,
      status: data.status,
      title: data.name,
      voteAverage: data.vote_average,
      voteCount: data.vote_count,
      genres: data.genres,
      type: 'Movie',
      releaseDate: data.first_air_date,
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
      similar: data.similar.results.map((series) => {
        return {
          backdropPath: series.backdrop_path ?? '',
          id: series.id,
          originalLanguage: series.original_language,
          originalTitle: series.original_name,
          overview: series.overview,
          popularity: series.popularity,
          releaseDate: series.first_air_date,
          title: series.name,
          voteAverage: series.vote_average,
          voteCount: series.vote_count,
          posterPath: series.poster_path ?? null,
          type: 'Series'
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
          creators: data.created_by.map((creator) => {
            return {
              id: creator.id,
              name: creator.name,
              department: 'Production',
              job: 'Producer',
              profilePath: creator.profile_path,
              creditId: creator.credit_id,
              originalName: creator.original_name,
              popularity: 0,
              knownForDepartment: 'Production'
            }
          })
        }
      }
    }

    return [null, formatData, url]
  } catch (error) {
    if (error instanceof Error) {
      return [error, null]
    }

    return [new Error('Something went wrong'), null]
  }
}
