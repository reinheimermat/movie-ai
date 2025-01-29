import * as React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Movie } from '@/utils/mutations/create-suggestions'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clock, Star } from 'lucide-react'
import Image from 'next/image'
import barbie from '../../public/barbie.png'
import indiana from '../../public/indiana.png'
import oppenheimer from '../../public/oppenheimer.png'
import { CardSkeleton } from './card-skeleton'

const initalMovies = [
  {
    id: 1,
    title: 'Indiana Jones',
    vote_average: 8.5,
    poster_path: indiana,
    release_date: '1981-06-12',
  },
  {
    id: 2,
    title: 'Oppenheimer',
    vote_average: 9.5,
    poster_path: oppenheimer,
    release_date: '2023-12-25',
  },
  {
    id: 3,
    title: 'Barbie',
    vote_average: 7.5,
    poster_path: barbie,
    release_date: '2021-12-25',
  },
]

export function MoviesCarousel() {
  const { data, error, isLoading } = useQuery<Movie[]>({
    queryKey: ['suggestions', prompt],
    enabled: false,
  })

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      {isLoading && (
        <div className="grid grid-cols-3 gap-4 justify-center items-center">
          {Array.from({ length: 3 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <CardSkeleton key={index} />
          ))}
        </div>
      )}

      {!data && (
        <Carousel>
          <CarouselContent>
            {initalMovies.map(movie => (
              <CarouselItem key={movie.id} className="lg:basis-1/3">
                <div>
                  <Card className="border-none flex flex-col justify-between">
                    <CardHeader className="flex-row items-center justify-between px-0 pt-0">
                      <CardTitle className="text-lg font-bold text-nowrap">
                        {movie.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-yellow-400">
                        <Star className="size-4" />
                        <p className="font-semibold text-lg">
                          {movie.vote_average}
                        </p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <Image
                        src={movie.poster_path}
                        alt={movie.title}
                        width={405}
                        height={600}
                        className="w-full object-cover rounded-lg max-h-[576px] h-full"
                        quality={100}
                      />
                    </CardContent>
                    <CardFooter className="px-0 pb-0 flex flex-col justify-between gap-5">
                      <div className="flex justify-between w-full">
                        <p className="flex items-center gap-1 text-sm">
                          <Clock className="size-5" />
                          <span>1h 30min</span>
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                          <Calendar className="size-5" />

                          <span>
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}

      {data && (
        <Carousel className="w-full">
          <CarouselContent className="space-x-4">
            {data.map((movie, index) => (
              <CarouselItem key={movie.id} className="lg:basis-1/3">
                <div>
                  <Card className="border-none flex flex-col justify-between">
                    <CardHeader className="flex-row items-center justify-between px-0 pt-0">
                      <CardTitle className="text-lg font-bold text-nowrap">
                        {movie.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 text-yellow-400">
                        <Star className="size-4" />
                        <p className="font-semibold text-lg">
                          {movie.vote_average || 0}
                        </p>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        width={405}
                        height={600}
                        className="w-full object-cover rounded-lg max-h-[576px] h-full"
                        quality={100}
                      />
                    </CardContent>
                    <CardFooter className="px-0 pb-0 flex flex-col justify-between gap-5">
                      <div className="flex justify-between w-full">
                        <p className="flex items-center gap-1 text-sm">
                          <Clock className="size-5" />
                          <span>1h 30min</span>
                        </p>
                        <p className="flex items-center gap-1 text-sm">
                          <Calendar className="size-5" />

                          <span>
                            {new Date(movie.release_date).getFullYear()}
                          </span>
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  )
}
