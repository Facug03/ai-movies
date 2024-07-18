import { Movie } from './movie'

export interface SearchResults {
  page: number
  data: Movie[]
  totalPages: number
  totalResults: number
}
