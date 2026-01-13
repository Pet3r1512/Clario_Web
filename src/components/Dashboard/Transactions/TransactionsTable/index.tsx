import { useQuery } from "@tanstack/react-query";
import ListByDate from "./ListByDate";
import getTransactions from "@/api/users/transactions/getTransactions";

interface TransactionsTableProps {
  userId: string | undefined;
}

export default function TransactionsTable({ userId }: TransactionsTableProps) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions({ userId }),
    enabled: !!userId,
  });

  if (!userId) return null; // or loading skeleton
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  return <ListByDate transactions={data?.transactions} />;
}
