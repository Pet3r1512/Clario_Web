import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import TransactionsHeader from "@/components/Dashboard/Transactions/TransactionsHeader";
import TransactionsTable from "@/components/Dashboard/Transactions/TransactionsTable";
import useFetchUser from "@/hooks/useFetchUser";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/transactions")({
  component: RouteComponent,
});

function RouteComponent() {
  const userId = useFetchUser();

  return (
    <DashboardLayout>
      <TransactionsHeader />
      <TransactionsTable userId={userId} />
    </DashboardLayout>
  );
}
