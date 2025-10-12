import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Overall from "@/components/Dashboard/Overall";
import TransactionButtons from "@/components/Dashboard/Overall/TransactionsButtons";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/auth/signin" });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout section="Dashboard">
      <TransactionButtons />
      <Overall />
    </DashboardLayout>
  );
}
