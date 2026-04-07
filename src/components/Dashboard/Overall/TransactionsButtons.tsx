import { Button } from "@/components/ui/button";
import { IncomeForm } from "./Forms/IncomeForm";

export default function TransactionButtons() {
  return (
    <div className="flex items-center gap-x-5 lg:justify-end">
      <IncomeForm />
      <Button className="bg-white text-black border-[0.5px] border-black hover:bg-white/90 rounded-2xl text-lg h-10.5">
        + Add Expense
      </Button>
    </div>
  );
}
