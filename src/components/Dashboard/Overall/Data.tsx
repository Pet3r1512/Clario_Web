import { Card } from "@/components/ui/card";
import { OverallDataType } from ".";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleAlert, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const GROWTH_RATE_ICON_SIZE = 16;

export default function Data({ data }: { data: OverallDataType }) {
  return (
    <Card className="w-full py-3.5 px-5 gap-2.5 shadow-lg lg:hover:shadow-2xl transition-all duration-150 ease-linear">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl font-extrabold">{data.name}</p>
        {data.icon}
      </div>
      {data.isError ? (
        <p className="lg:text-xl font-semibold text-red-500 flex items-center gap-x-2">
          Failed To Load <CircleAlert />
        </p>
      ) : (
        <div
          className={cn(
            "lg:text-xl font-semibold flex items-center gap-1",
            data.name === "Income Growth" &&
              (data.amount >= 0 ? "text-green-500" : "text-red-500"),
          )}
        >
          {data.isLoading ? (
            <Skeleton className="w-1/2 h-7" />
          ) : data.name !== "Income Growth" ? (
            `${Number(data.amount ?? 0).toFixed(2)}`
          ) : (
            <>
              {Number(data.amount)}%
              {data.amount >= 0 ? (
                <TrendingUp size={GROWTH_RATE_ICON_SIZE} />
              ) : (
                <TrendingDown size={GROWTH_RATE_ICON_SIZE} />
              )}
            </>
          )}
        </div>
      )}
      <p className="text-gray-400 lg:text-sm">{data.subtitle}</p>
    </Card>
  );
}
