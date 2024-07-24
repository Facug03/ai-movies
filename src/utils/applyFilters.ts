import { MovieFilters } from '@/types/filters'

export const applyFilters = (url: string, filters: MovieFilters) => {
  const { page, language, genres } = filters

  if (page) {
    if (url.includes('page=')) url = url.replace(/page=\d+/, `page=${page}`)
    else url = url + `&page=${page}`
  }
  if (language) {
    if (url.includes('language=')) url = url.replace(/language=\w+/, `language=${language}`)
    else url = url + `&language=${language}`
  }
  if (genres && genres.length > 0) {
    if (url.includes('with_genres=')) url = url.replace(/with_genres=\d+/, `with_genres=${genres.join(',')}`)
    else url = url + `&with_genres=${genres.join(',')}`
  }

  return url
}
