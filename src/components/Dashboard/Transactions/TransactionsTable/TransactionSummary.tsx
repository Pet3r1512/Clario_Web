import { TransactionInfo } from "./ListByDate";
enum CategoryType {
  "EXPENSE",
  "INCOME",
}

export default function TransactionSummary({
  transaction,
}: {
  transaction: TransactionInfo;
}) {
  return <div>{transaction.amount}</div>;
}
