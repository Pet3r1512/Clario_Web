import IncomeTable from "./IncomeTable";

export default function IncomeTableContainer() {
  return (
    <section className="bg-white rounded-2xl shadow-2xl p-5 h-[70dvh] overflow-auto">
      <p className="text-lg lg:text-xl font-bold">Income Sources</p>
      <IncomeTable />
    </section>
  );
}
