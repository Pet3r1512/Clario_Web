import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import ParseISOStringDate from "@/helpers/parseISOStringData";

export function IncomeTable({
  transactions,
  lastElementRef,
}: {
  transactions: TransactionInfo[];
  lastElementRef: (node: HTMLTableRowElement | null) => void;
}) {
  const lastTxId = transactions[transactions.length - 1]?.id;

  return (
    <Table className="flex-1">
      <TableCaption>A list of your recent income.</TableCaption>

      <TableHeader>
        <TableRow className="text-md lg:text-lg">
          <TableHead className="w-1/5">Date</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Description</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.id}
            ref={transaction.id === lastTxId ? lastElementRef : undefined}
            className="lg:hover:bg-gray-100 lg:hover:scale-[99%] transition-all duration-150 ease-linear"
          >
            <TableCell className="text-gray-800">
              {ParseISOStringDate({ date: transaction.date })}
            </TableCell>

            <TableCell>{transaction.description}</TableCell>

            <TableCell className="font-medium">{transaction.amount}</TableCell>

            <TableCell className="text-right">
              {transaction.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
