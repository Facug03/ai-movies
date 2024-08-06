import { Genre } from './genres'
import { Media } from './media'

export interface SeriesDetail extends Media {
  genres: Genre[]
  originCountry: string[]
  lastAirDate: string
  numberOfEpisodes: number
  numberOfSeasons: number
  status: string
  videos: Video[]
  images: Images
  similar: Media[]
  credits: Credits
}

export interface Video {
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
    creators: Crew[]
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
