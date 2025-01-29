import { generateMovieSuggestions } from '@/services/gemini-service'
import { fetchMovieDetails } from '@/services/tmdb-service'
import type { Movie, tmdbResponse } from '@/utils/mutations/create-suggestions'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt } = body

    const formattedQuery = await generateMovieSuggestions(prompt)

    const tmdbResponse: tmdbResponse[] = await fetchMovieDetails(formattedQuery)

    const movies: Movie[] = tmdbResponse[0].results

    return new Response(JSON.stringify(movies), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response('error', {
      status: 500,
    })
  }
}
