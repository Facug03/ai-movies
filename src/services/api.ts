export const baseUrl = 'https://api.themoviedb.org/3'

export const apis = {
  movies: {
    nowPlaying: `${baseUrl}/movie/now_playing?language=en-US&page=1`,
    popular: `${baseUrl}/movie/popular?language=en-US&page=1`,
    topRated: `${baseUrl}/movie/top_rated?language=en-US&page=1`,
    upcoming: `${baseUrl}/movie/upcoming?language=en-US&page=1`
  },
  series: {
    onTheAir: `${baseUrl}/tv/on_the_air?language=en-US&page=1`,
    popular: `${baseUrl}/tv/popular?language=en-US&page=1`,
    topRated: `${baseUrl}/tv/top_rated?language=en-US&page=1`,
    upcoming: `${baseUrl}/tv/upcoming?language=en-US&page=1`,
    anime: `${baseUrl}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_average.desc&vote_count.gte=300&with_genres=16&with_origin_country=JP`
  },
  all: {
    trending: `${baseUrl}/trending/all/week?language=en-US&page=1`,
    search: `${baseUrl}/search/multi?language=en-US&include_adult=false`
  }
}
