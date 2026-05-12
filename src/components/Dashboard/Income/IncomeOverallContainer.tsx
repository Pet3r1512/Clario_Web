import { ChartNoAxesCombined, Crown, MoveDown } from "lucide-react";
import { OverallDataType } from "../Overall";
import Data from "../Overall/Data";
import { useQuery } from "@tanstack/react-query";
import useFetchUser from "@/hooks/useFetchUser";
import getTotalIncomeByMonth from "@/api/users/transactions/getTotalIncomeByMonth";
import getHighestIncomeOfMonth from "@/api/users/analytics/getHighestIncomeOfMonth";

export default function IncomeOverallContainer() {
  const userId = useFetchUser();

  const totalIncomeQuery = useQuery({
    queryKey: ["totalIncome", userId],
    queryFn: () => getTotalIncomeByMonth({ userId: userId! }),
    enabled: !!userId,
  });

  const highestIncomeOfMonth = useQuery({
    queryKey: ["highestIncomeOfMonth", userId],
    queryFn: () => getHighestIncomeOfMonth({ userId: userId! }),
    enabled: !!userId,
  });

  const placeholderData: OverallDataType[] = [
    {
      name: "Total Income",
      subtitle: "This Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100">
          <MoveDown className="text-green-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: totalIncomeQuery.data?.totalCurrentMonthIncome.totalIncome,
    },
    {
      name: "Highest Income Source",
      subtitle:
        highestIncomeOfMonth.data?.highestIncomeOfMonth.allIncomeAmount[0]
          .category.name,
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-yellow-100">
          <Crown className="text-yellow-600" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount:
        highestIncomeOfMonth.data?.highestIncomeOfMonth.allIncomeAmount[0]
          .amount,
    },
    {
      name: "Income Growth",
      subtitle: "vs Last Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-purple-100">
          <ChartNoAxesCombined className="text-purple-600" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: -10,
    },
  ];
  return (
    <section className="flex flex-col md:flex-row items-stretch gap-y-5 md:gap-x-5 max-w-7xl">
      {placeholderData.map((data) => {
        return <Data key={data.name} data={data} />;
      })}
    </section>
  );
}
