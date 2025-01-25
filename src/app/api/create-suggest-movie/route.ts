import { client } from '@/app/lib/client'
import { env } from '@/env'
import axios from 'axios'
import MovieDB from 'node-themoviedb'

export async function POST(req: Request) {
  const body = await req.json()
  const { prompt } = body as { prompt: string }

  const model = client.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      maxOutputTokens: 100,
    },
  })

  const geminiPrompt = `Sugira filmes para alguém que descreveu: "${prompt}. Gere somente os títulos dos filmes e no formato de uma url query, exemplo: ?query=Jack+Reacher"`

  const { response } = await model.generateContent(geminiPrompt)

  if (!response) {
    return new Response('Failed to generate content', {
      status: 500,
    })
  }

  const querysFormated = response
    .text()
    .split('\n')
    .map(query => query.trim())

  const querysUrl = querysFormated.map(
    query =>
      `https://api.themoviedb.org/3/search/movie${query}&&language=pt-BR&&api_key=${env.TMDB_API_KEY}`,
  )

  try {
    const requests = querysUrl.map(query =>
      axios.get(query, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${env.TMDB_API_KEY}`,
        },
      }),
    )

    const responses = await Promise.all(requests)

    const movies = responses.map(response => response.data)

    return new Response(JSON.stringify(movies), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Erro ao chamar o axios:', error)
    return new Response('Failed to fetch movies', {
      status: 500,
    })
  }
}
