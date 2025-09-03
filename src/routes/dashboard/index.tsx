import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Overall from "@/components/Dashboard/Overall";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout section="Dashboard">
      <Overall />
    </DashboardLayout>
  );
}
