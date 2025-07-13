import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="container py-8">
        <Skeleton className="mb-4 h-10 w-[250px]" />
        <Skeleton className="mb-8 h-5 w-[350px]" />

        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] rounded-lg" />
          <Skeleton className="h-[300px] rounded-lg" />
        </div>
      </div>
    </DashboardLayout>
  )
}
