import { api } from '@/lib/axios'

export interface tmdbResponse {
  page: number
  results: Array<{
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
  }>
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export async function CreateSuggestionsMutation(prompt: string) {
  try {
    const { data } = await api.post<Movie[]>('/create-suggest-movie', {
      prompt,
    })

    if (!data) {
      throw new Error('Não foi possível criar sugestões')
    }

    return data
  } catch (err) {
    throw new Error(
      'Não foi possível criar sugestões, por favor, tente novamente.',
    )
  }
}
