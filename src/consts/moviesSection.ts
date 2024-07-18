import { apis } from '@/services/api'
import { MoviesSections } from '@/types/movie'

export const moviesSection: Record<MoviesSections, keyof typeof apis.movies> = {
  'In theathers': 'nowPlaying',
  'Popular': 'popular',
  'Top rated': 'topRated',
  'Upcoming': 'upcoming',
}
