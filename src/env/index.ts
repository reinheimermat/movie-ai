import { z } from 'zod'

const envSchema = z.object({
  GEMINI_API_KEY: z.string(),
  TMDB_API_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new Error(`Invalid environment variables: ${_env.error.errors}`)
}

export const env = _env.data
