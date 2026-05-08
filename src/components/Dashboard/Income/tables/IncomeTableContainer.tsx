import useFetchTransactions from "@/hooks/useFetchTransactions";
import IncomeTable from "./IncomeTable";

export default function IncomeTableContainer() {
  const { data } = useFetchTransactions({ option: "onlyIncome" });

  console.log(data);
  return (
    <section className="bg-white rounded-2xl shadow-2xl p-5 h-[70dvh] overflow-auto">
      <p className="text-lg lg:text-xl font-bold">Income Sources</p>
      <IncomeTable />
    </section>
  );
}
