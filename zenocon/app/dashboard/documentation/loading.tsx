import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DocumentationLoading() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <Skeleton className="h-10 w-full md:w-[300px]" />
        </div>

        <Skeleton className="h-10 w-96 mb-6" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
            ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
