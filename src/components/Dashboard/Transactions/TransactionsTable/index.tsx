/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from "@tanstack/react-query";
import ListByDate, { TransactionInfo } from "./ListByDate";
import getTransactions from "@/api/users/transactions/getTransactions";
import { useCallback, useRef } from "react";

interface TransactionsTableProps {
  userId: string | undefined;
}

interface TransactionsResponse {
  transactions: {
    transactions: TransactionInfo[];
    hasMore: boolean;
  };
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
  } = useInfiniteQuery<TransactionsResponse>({
    queryKey: ["transactions", userId],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getTransactions({
        userId,
        page: pageParam as number,
      });
      return {
        transactions: response.transactions,
        hasMore: response.transactions.length > 0,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.transactions.hasMore) return undefined;
      return allPages.length + 1;
    },
    enabled: !!userId,
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
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

  const allTransactions: TransactionInfo[] =
    data?.pages.flatMap((page) => page.transactions.transactions) ?? [];

  if (!userId) return null;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{(error as Error).message}</div>;

  return (
    <ListByDate
      lastElementRef={lastElementRef}
      transactions={allTransactions}
    />
  );
}
