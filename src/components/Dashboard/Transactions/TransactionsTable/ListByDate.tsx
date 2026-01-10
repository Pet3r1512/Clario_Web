import { Currency } from "@/api/users/createBalance";
import TransactionSummary from "./TransactionSummary";

export type TransactionInfo = {
  id: string;
  userId: string;
  categoryId: number | undefined;
  amount: number;
  currency: Currency;
  date: Date;
};

export default function ListByDate({
  transactions,
}: {
  transactions: TransactionInfo[];
}) {
  console.log(transactions);

  return (
    <div>
      <div className="p-1.5 rounded-lg bg-gray-200 text-black font-semibold lg:hover:pl-5 lg:hover:bg-primary/50 transition-all duration-150 ease-linear">
        Friday, 09 Jan 2026
      </div>
      <div>
        {transactions.map((transaction, index) => {
          return <TransactionSummary key={index} transaction={transaction} />;
        })}
      </div>
    </div>
  );
}
