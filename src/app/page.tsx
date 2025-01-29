'use client'

import { MoviesCarousel } from '@/components/carousel'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/header'

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto max-w-screen-xl px-4 py-16 min-h-screen flex flex-col justify-between">
        <Header />
        <MoviesCarousel />
      </div>
    </QueryClientProvider>
  )
}
