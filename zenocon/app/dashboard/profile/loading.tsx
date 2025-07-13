import { Skeleton } from "@/components/ui/skeleton"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function ProfileLoading() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-10 w-64 mb-6" />
            <Skeleton className="h-[500px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
