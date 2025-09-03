import { MoveDown, MoveUp, Wallet } from "lucide-react";
import Data from "./Data";

export default function Overall() {
  const data = [
    {
      name: "Total Balance",
      subtitle: "Current Balance",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-blue-100">
          <Wallet className="text-blue-500" />
        </div>
      ),
    },
    {
      name: "Income",
      subtitle: "Total Income",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100">
          <MoveDown className="text-green-500" />
        </div>
      ),
    },
    {
      name: "Expenses",
      subtitle: "Total Expenses",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100">
          <MoveUp className="text-red-500" />
        </div>
      ),
    },
  ];
  return (
    <section className="flex items-center lg:gap-x-5 max-w-6xl">
      {data.map((data) => {
        return <Data key={data.name} data={data} />;
      })}
    </section>
  );
}
