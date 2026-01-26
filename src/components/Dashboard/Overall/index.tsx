import { MoveDown, MoveUp, Wallet } from "lucide-react";
import Data from "./Data";
import { useQuery } from "@tanstack/react-query";
import getCurrentBalance from "@/api/users/balances/getCurrentBalance";
import { authClient } from "@/lib/auth-client";

export default function Overall() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session;
    },
    retry: false,
  });

  const userId = userQuery.data?.data?.user?.id;

  const balanceQuery = useQuery({
    queryKey: ["balance", userId],
    enabled: !!userId,
    queryFn: () =>
      getCurrentBalance({
        userId: userId!,
      }),
  });

  const currentBalance = balanceQuery.data?.balance.balance ?? 0;

  const data = [
    {
      name: "Total Balance",
      subtitle: "Current Balance",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-blue-100">
          <Wallet className="text-blue-500" />
        </div>
      ),
      amount: currentBalance,
    },
    {
      name: "Income",
      subtitle: "Total Income",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100">
          <MoveDown className="text-green-500" />
        </div>
      ),
      amount: 0,
    },
    {
      name: "Expenses",
      subtitle: "Total Expenses",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100">
          <MoveUp className="text-red-500" />
        </div>
      ),
      amount: 0,
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center gap-y-5 lg:gap-x-5 max-w-7xl">
      {data.map((item) => (
        <Data key={item.name} data={item} />
      ))}
    </section>
  );
}
