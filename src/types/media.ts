export interface Media {
  id: number
  backdropPath: string
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string | null
  releaseDate: string | null
  title: string
  voteAverage: number
  voteCount: number
  type?: 'Movie' | 'Series'
}

export type MoviesSections = 'In theathers' | 'Popular' | 'Top rated films' | 'Upcoming'

export type SeriesSections = 'Animes we recommend'
