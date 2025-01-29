import { Skeleton } from './ui/skeleton'

export function CardSkeleton() {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="w-[137px] h-7" />
        <Skeleton className="h-7 w-12" />
      </div>

      <Skeleton className="w-full h-[576px] rounded-lg" />

      <div className="flex items-center justify-between">
        <Skeleton className="w-16 h-5" />
        <Skeleton className="w-14 h-5" />
      </div>

      <Skeleton className="w-full h-11" />
    </div>
  )
}
