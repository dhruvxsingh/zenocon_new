import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-6xl py-8">
      <Skeleton className="mb-4 h-10 w-[250px]" />
      <Skeleton className="mb-8 h-5 w-[350px]" />

      <div className="mb-6 flex gap-2">
        <Skeleton className="h-10 w-[150px] rounded-md" />
        <Skeleton className="h-10 w-[150px] rounded-md" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Skeleton className="h-[500px] rounded-lg" />
        <div className="space-y-8">
          <Skeleton className="h-[250px] rounded-lg" />
          <Skeleton className="h-[200px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
