import { Currency } from "@/api/users/createBalance";
import TransactionSummary from "./TransactionSummary";

export type TransactionInfo = {
  id: string;
  userId: string;
  categoryId?: number;
  amount: number;
  currency: Currency;
  date: string;
};

export default function ListByDate({
  transactions = [],
}: {
  transactions?: TransactionInfo[];
}) {
  const groupedByDate = transactions.reduce(
    (acc, tx) => {
      const dateKey = new Date(tx.date).toLocaleDateString("en-CA");

      acc[dateKey] ??= [];
      acc[dateKey].push(tx);

      return acc;
    },
    {} as Record<string, TransactionInfo[]>,
  );

  if (Object.keys(groupedByDate).length === 0) {
    return <div className="text-gray-500">No transactions</div>;
  }
  return (
    <div className="space-y-5">
      <div className="p-1.5 rounded-lg bg-gray-200 text-black font-semibold lg:hover:pl-5 lg:hover:bg-primary/50 transition-all duration-150 ease-linear">
        Friday, 09 Jan 2026
      </div>
      <div className="space-y-5">
        {transactions.map((transaction, index) => {
          return <TransactionSummary key={index} transaction={transaction} />;
        })}
      </div>
    </div>
  );
}
