import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import IncomeOverallContainer from "@/components/Dashboard/Income/IncomeOverallContainer";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/income")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DashboardLayout
      section="Income"
      sectionDesc="Track and manage your income sources"
    ></DashboardLayout>
      <IncomeOverallContainer />
  );
}
