import { env } from '@/env'
import axios from 'axios'

export async function fetchMovieDetails(queries: string[]) {
  const tmdbURLQuery = queries.map(
    query =>
      `https://api.themoviedb.org/3/search/movie${query}&&language=pt-BR&&api_key=${env.TMDB_API_KEY}`,
  )

  const requests = tmdbURLQuery.map(query =>
    axios.get(query, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.TMDB_API_KEY}`,
      },
    }),
  )

  const responses = await Promise.all(requests)
  const movies = responses.map(response => response.data)

  console.log('tmdb service response', movies)

  return movies
}
