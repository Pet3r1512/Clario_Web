import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";

export default function groupTransactions(transactions: TransactionInfo[]) {
  const groupedByDate = transactions.reduce(
    (acc, tx) => {
      const dateKey = new Date(tx.date).toLocaleDateString("en-CA");

      acc[dateKey] ??= [];
      acc[dateKey].push(tx);

      return acc;
    },
    {} as Record<string, TransactionInfo[]>,
  );

  return groupedByDate;
}
