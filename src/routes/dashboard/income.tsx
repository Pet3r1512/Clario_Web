import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/income")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout
      section="Income"
      sectionDesc="Track and manage your income sources"
    >
      <div>Hello "/dashboard/income"!</div>
    </DashboardLayout>
  );
}
