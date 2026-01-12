import { ComponentMap } from "@/types/ComponentMap";
import { TransactionInfo } from "./ListByDate";
import { ArrowDown, ArrowUp } from "lucide-react";

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
  const TransactionTypeDictionary: ComponentMap = {
    INCOME: (
      <div className="size-max p-2.5 rounded-full bg-green-200">
        <ArrowUp size={20} className="text-green-900 font-extrabold" />
      </div>
    ),
    EXPENSE: (
      <div className="size-max p-2.5 rounded-full bg-red-200">
        <ArrowDown size={20} className="text-red-800 font-extrabold" />
      </div>
    ),
  };

  const TransactionAmountTextColor: Record<string, string> = {
    INCOME: "text-green-500",
    EXPENSE: "text-red-500",
  };

  const globalCategories = sessionStorage.getItem("globalCategories")
    ? JSON.parse(sessionStorage.getItem("globalCategories") || "[]")
    : [];

  const currCategory: CurrentCategory = globalCategories.find(
    (c: { id: number | undefined }) => c.id === transaction.categoryId,
  );

  return (
    <div className="rounded-2xl px-2.5 py-3 bg-gray-200 flex items-center gap-x-5">
      {currCategory && TransactionTypeDictionary[currCategory.type]}
      <div className="space-y-2 flex-1">
        <p className="font-semibold">{currCategory.name}</p>
        <p>{currCategory.description}</p>
      </div>
      <p
        className={`text-xl font-semibold ${TransactionAmountTextColor[currCategory.type]}`}
      >
        {currCategory.type.toString() === "INCOME" ? "+ " : "- "}
        {transaction.amount}
      </p>
    </div>
  );
}
