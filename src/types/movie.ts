export interface Movie {
  id: number
  backdrop_path: string
  originalLanguage: string
  originalTitle: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string | null
  title: string
  vote_average: number
  vote_count: number
  type?: 'Movie' | 'Series'
}

export type MoviesSections = 'In theathers' | 'Popular' | 'Top rated films' | 'Upcoming'

export type SeriesSections = 'Animes we recommend'
