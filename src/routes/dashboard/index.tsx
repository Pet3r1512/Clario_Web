import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Overall from "@/components/Dashboard/Overall";
import TransactionButtons from "@/components/Dashboard/Overall/TransactionsButtons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/auth/signin" });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <DashboardLayout section="Dashboard">
      <TransactionButtons />
      <Overall />
    </DashboardLayout>
  );
}
