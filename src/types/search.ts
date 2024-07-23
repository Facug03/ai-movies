import { Media } from './media'

export interface SearchResults {
  page: number
  data: Media[]
  totalPages: number
  totalResults: number
}
