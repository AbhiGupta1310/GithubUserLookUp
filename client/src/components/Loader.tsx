import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loader() {
  return (
    <Card className="w-full p-6 shadow-lg">
      <div className="flex items-center gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>
      <Skeleton className="h-4 w-[80%] mt-6" />
      <Skeleton className="h-4 w-[60%] mt-2" />

      <div className="grid grid-cols-3 gap-4 my-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-3 rounded-lg bg-primary/5">
            <Skeleton className="h-8 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
        ))}
      </div>

      <Skeleton className="h-[1px] w-full my-6" />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[180px]" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-[220px]" />
        </div>
      </div>
    </Card>
  );
}