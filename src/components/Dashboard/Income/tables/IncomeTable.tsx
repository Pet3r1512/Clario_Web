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
        <TableRow>
          <TableHead className="w-25">Date</TableHead>
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
          >
            <TableCell className="font-medium">{transaction.date}</TableCell>

            <TableCell>{transaction.description}</TableCell>

            <TableCell>{transaction.amount}</TableCell>

            <TableCell className="text-right">
              {transaction.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
