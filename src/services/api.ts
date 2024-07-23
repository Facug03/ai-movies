export const baseUrl = 'https://api.themoviedb.org/3'

export const apis = {
  movies: {
    nowPlaying: `${baseUrl}/movie/now_playing?`,
    popular: `${baseUrl}/discover/movie?sort_by=popularity.desc`,
    topRated: `${baseUrl}/movie/top_rated?`,
    upcoming: `${baseUrl}/movie/upcoming?`,
    genres: `${baseUrl}/genre/movie/list?language=en`,
    anime: `${baseUrl}/discover/movie?include_adult=false&include_null_first_air_dates=false&sort_by=vote_average.desc&vote_count.gte=300&with_genres=16&with_origin_country=JP`
  },
  series: {
    onTheAir: `${baseUrl}/tv/on_the_air?`,
    popular: `${baseUrl}/discover/tv?sort_by=popularity.desc`,
    topRated: `${baseUrl}/tv/top_rated?`,
    upcoming: `${baseUrl}/tv/upcoming?`,
    anime: `${baseUrl}/discover/tv?include_adult=false&include_null_first_air_dates=false&sort_by=vote_average.desc&vote_count.gte=300&with_genres=16&with_origin_country=JP`,
    genres: `${baseUrl}/genre/tv/list?language=en`
  },
  all: {
    trending: `${baseUrl}/trending/all/week`,
    search: `${baseUrl}/search/multi?`
  }
}
