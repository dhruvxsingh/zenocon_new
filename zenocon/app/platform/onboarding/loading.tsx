import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-5xl py-8">
      <Skeleton className="mb-4 h-10 w-[250px]" />
      <Skeleton className="mb-8 h-5 w-[350px]" />

      <Skeleton className="mb-8 h-[400px] rounded-lg" />
      <Skeleton className="h-[200px] rounded-lg" />
    </div>
  )
}
