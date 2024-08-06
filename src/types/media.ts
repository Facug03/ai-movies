export interface Media {
  id: number
  backdropPath: string | null
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  posterPath: string | null
  releaseDate: string | null
  title: string
  voteAverage: number
  voteCount: number
  type?: MediaType
}

export type MoviesSections = 'In theathers' | 'Popular' | 'Top rated films' | 'Upcoming'

export type SeriesSections = 'Animes we recommend' | 'Streaming Now'

export type MediaType = 'Movie' | 'Series'
