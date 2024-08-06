import { Movies } from '@/types/api-movie-db/movies'
import { Series } from '@/types/api-movie-db/series'
import { Media } from '@/types/media'
import { MovieDetail } from '@/types/movie-detail'
import { SeriesDetail } from '@/types/series-detail'

export const formatMovies = (movies: Movies[]): Media[] => {
  return movies.map((movie) => {
    return {
      backdropPath: movie.backdrop_path,
      id: movie.id,
      originalLanguage: movie.original_language,
      originalTitle: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      type: 'Movie'
    }
  })
}

export const formatSeries = (series: Series[]): Media[] => {
  return series.map((show) => {
    return {
      backdropPath: show.backdrop_path,
      id: show.id,
      originalLanguage: show.original_language,
      originalTitle: show.original_name,
      overview: show.overview,
      popularity: show.popularity,
      posterPath: show.poster_path,
      releaseDate: show.first_air_date,
      title: show.name,
      voteAverage: show.vote_average,
      voteCount: show.vote_count,
      type: 'Series'
    }
  })
}

export const formatMovieDetail = (movie: MovieDetail): Media => {
  return {
    backdropPath: movie.backdropPath,
    id: movie.id,
    originalLanguage: movie.originalLanguage,
    originalTitle: movie.originalTitle,
    overview: movie.overview,
    popularity: movie.popularity,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
    title: movie.title,
    voteAverage: movie.voteAverage,
    voteCount: movie.voteCount,
    type: 'Movie'
  }
}

export const formatSeriesDetail = (series: SeriesDetail): Media => {
  return {
    backdropPath: series.backdropPath,
    id: series.id,
    originalLanguage: series.originalLanguage,
    originalTitle: series.originalTitle,
    overview: series.overview,
    popularity: series.popularity,
    posterPath: series.posterPath,
    releaseDate: series.releaseDate,
    title: series.title,
    voteAverage: series.voteAverage,
    voteCount: series.voteCount,
    type: 'Series'
  }
}
