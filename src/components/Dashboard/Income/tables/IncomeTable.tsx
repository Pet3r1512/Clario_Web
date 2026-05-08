import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import ParseISOStringDate from "@/helpers/parseISOStringData";
import CategoryTag from "../../Category/CategoryTag";

export function IncomeTable({
  transactions,
  lastElementRef,
}: {
  transactions: TransactionInfo[];
  lastElementRef: (node: HTMLTableRowElement | null) => void;
}) {
  const lastTxId = transactions[transactions.length - 1]?.id;

  return (
    <Table className="flex-1 overflow-x-auto">
      <TableHeader>
        <TableRow className="text-md lg:text-lg">
          <TableHead className="w-1/4">Date</TableHead>
          <TableHead className="w-1/2 lg:w-[15%]">Source</TableHead>
          <TableHead className="w-1/4 lg:w-1/5 text-right md:text-left">
            Amount
          </TableHead>
          <TableHead className="w-full text-right hidden md:flex md:items-center md:justify-end">
            Description
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {transactions.map((transaction) => (
          <TableRow
            key={transaction.id}
            ref={transaction.id === lastTxId ? lastElementRef : undefined}
            className="lg:hover:bg-gray-100 lg:hover:scale-[99%] transition-all duration-150 ease-linear"
          >
            <TableCell className="w-[25%] text-gray-800">
              {ParseISOStringDate({ date: transaction.date })}
            </TableCell>

            <TableCell className="w-1/2 lg:w-[15%]">
              {
                <CategoryTag
                  categoryId={transaction.categoryId?.toString() || "0"}
                />
              }
            </TableCell>

            <TableCell className="w-1/4 lg:w-1/5 font-medium text-right md:text-left">
              {transaction.amount}
            </TableCell>

            <TableCell className="w-full text-right hidden md:block">
              {transaction.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
