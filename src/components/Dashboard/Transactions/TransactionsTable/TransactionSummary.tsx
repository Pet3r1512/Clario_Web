import { TransactionInfo } from "./ListByDate";

export default function TransactionSummary({
  transaction,
}: {
  transaction: TransactionInfo;
}) {
  return <div>{transaction.amount}</div>;
}
