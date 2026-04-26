import { useInfiniteQuery } from "@tanstack/react-query";
import ListByDate, { TransactionInfo } from "./ListByDate";
import getTransactions from "@/api/users/transactions/getTransactions";
import { useCallback, useRef } from "react";

interface TransactionsTableProps {
  userId: string | undefined;
}

interface TransactionsResponse {
  success: boolean;
  transactions: TransactionInfo[];
}

export default function TransactionsTable({ userId }: TransactionsTableProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["transactions", userId],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getTransactions({ userId, page: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (!(lastPage as TransactionsResponse).success) return undefined;
      return allPages.length + 1;
    },
    enabled: !!userId,
  });

  const lastElementRef = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (node: any) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const allTransactions =
    data?.pages.flatMap((page) => page.transactions) ?? [];

  if (!userId) return null; // or loading skeleton
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  return (
    <ListByDate
      lastElementRef={lastElementRef}
      transactions={allTransactions}
    />
  );
}
