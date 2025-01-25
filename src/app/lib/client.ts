import { env } from '@/env'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const client = new GoogleGenerativeAI(env.GEMINI_API_KEY)
