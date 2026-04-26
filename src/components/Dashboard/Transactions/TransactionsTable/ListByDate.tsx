import { Currency } from "@/api/users/createBalance";
import TransactionSummary from "./TransactionSummary";
import groupTransactions from "@/lib/groupTransactions";

export type TransactionInfo = {
  id: string;
  userId: string;
  categoryId?: number;
  amount: number;
  currency: Currency;
  date: string;
  description: string;
};

export default function ListByDate({
  transactions = [],
  lastElementRef,
}: {
  transactions?: TransactionInfo[];
  lastElementRef: (node: HTMLDivElement | null) => void;
}) {
  const groupedByDate = groupTransactions(transactions);

  if (Object.keys(groupedByDate).length === 0) {
    return <div className="text-gray-500">No transactions</div>;
  }

  const sortedEntries = Object.entries(groupedByDate).sort(([a], [b]) =>
    b.localeCompare(a),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allTxs = sortedEntries.flatMap(([_, txs]) => txs);
  const lastTxId = allTxs[allTxs.length - 1]?.id;

  return (
    <section className="space-y-10 max-h-[82.5%] overflow-y-auto">
      {sortedEntries.map(([date, txs]) => (
        <div key={date} className="space-y-5">
          <div className="p-1.5 rounded-lg bg-gray-200 font-semibold">
            {date}
          </div>

          {txs.map((tx) => (
            <TransactionSummary
              key={tx.id}
              transaction={tx}
              lastElementRef={tx.id === lastTxId ? lastElementRef : undefined}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
