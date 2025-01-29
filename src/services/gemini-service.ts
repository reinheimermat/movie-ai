import { gemini } from '@/lib/genAI'

export async function generateMovieSuggestions(prompt: string) {
  console.log(prompt)

  const geminiPrompt = `
    Sugira filmes para alguém que descreveu: "${prompt}. Gere SOMENTE SOMENTE OS TÍTULOS
    dos filmes em Idioma Inglês e mais nada no prompt, sempre os mais famosos e no formato de query da biblioteca TMDB, exemplo: ?query=Jack+Reacher"
  `

  const { response } = await gemini.generateContent(geminiPrompt)

  if (!response) {
    throw new Error('Failed to generate content')
  }

  const formattedQuery = response
    .text()
    .split('\n')
    .map(query => query.trim())

  return formattedQuery
}
