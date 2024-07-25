import { Genre } from './genres'
import { Media } from './media'

export interface MediaDetail extends Media {
  budget: number
  genres: Genre[]
  originCountry: string[]
  revenue: number
  runtime: number
  status: string
  videos: Videos[]
  images: Images
  similar: Media[]
  credits: Credits
}

export interface Videos {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  publishedAt: string
  id: string
}

export interface Images {
  backdrops: Backdrop[]
}

export interface Backdrop {
  aspectRatio: number
  height: number
  iso_639_1: string
  filePath: string
  voteAverage: number
  voteCount: number
  width: number
}

export interface Poster {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface Credits {
  cast: Cast[]
  crew: {
    directors: Crew[]
    writers: Crew[]
  }
}

export interface Cast {
  id: number
  knownForDepartment: string
  name: string
  originalName: string
  popularity: number
  profilePath?: string
  character: string
}

export interface Crew {
  id: number
  knownForDepartment: string
  name: string
  originalName: string
  popularity: number
  profilePath?: string
  department: string
  job: string
}
