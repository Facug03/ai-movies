import { Media } from '@/types/media'

export interface PaginatedResponse {
  page: number
  results: Media[]
  totalPages: number
  totalResults: number
}
