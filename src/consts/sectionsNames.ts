import { apis } from '@/services/api'
import { MoviesSections, SeriesSections } from '@/types/movie'

export const moviesSection: Record<MoviesSections, keyof typeof apis.movies> = {
  'In theathers': 'nowPlaying',
  Popular: 'popular',
  'Top rated films': 'topRated',
  Upcoming: 'upcoming'
}

export const seriesSections: Record<SeriesSections, keyof typeof apis.series> = {
  'Animes we recommend': 'anime'
}
