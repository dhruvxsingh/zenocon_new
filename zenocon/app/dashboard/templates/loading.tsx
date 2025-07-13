import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TemplatesLoading() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[350px] mt-2" />
          </div>
          <Skeleton className="h-10 w-[150px]" />
        </div>

        <Card>
          <CardHeader className="p-4">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-4 w-[200px] mt-2" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex items-center gap-2 p-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className="border-t">
              <div className="p-4">
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-6 w-[250px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-6 w-[100px]" />
                      <Skeleton className="h-6 w-[40px] ml-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
