import { TransactionInfo } from "./ListByDate";
enum CategoryType {
  "EXPENSE",
  "INCOME",
}

type CurrentCategory = {
  id: number;
  type: CategoryType;
  name: string;
  description: string;
};

export default function TransactionSummary({
  transaction,
}: {
  transaction: TransactionInfo;
}) {
  return <div>{transaction.amount}</div>;
}
