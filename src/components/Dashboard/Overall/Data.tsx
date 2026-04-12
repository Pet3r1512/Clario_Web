import { Card } from "@/components/ui/card";
import { OverallDataType } from ".";
import { Skeleton } from "@/components/ui/skeleton";

export default function Data({ data }: { data: OverallDataType }) {
  return (
    <Card className="w-full py-3.5 px-5 gap-2.5 shadow-lg lg:hover:shadow-2xl transition-all duration-150 ease-linear">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl font-extrabold">{data.name}</p>
        {data.icon}
      </div>
      <p className="lg:text-xl font-semibold">
        {data.isLoading ? (
          <Skeleton className="w-1/2 h-7" />
        ) : (
          `${Number(data.amount ?? 0).toFixed(2)}`
        )}
      </p>
      <p className="text-gray-400 lg:text-sm">{data.subtitle}</p>
    </Card>
  );
}
