export interface Data {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

export interface Result {
  backdrop_path: string
  id: number
  name?: string
  original_name?: string
  overview: string
  poster_path: string | null
  media_type: string
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  first_air_date?: string
  vote_average: number
  vote_count: number
  origin_country?: string[]
  title?: string
  original_title?: string
  release_date?: string
  video?: boolean
}
