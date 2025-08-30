import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { useCurrentUrl } from "@/hooks/useCurrentUrl";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const currUrl = useCurrentUrl();

  useEffect(() => {
    console.log(currUrl);
  }, [currUrl]);

  return <DashboardLayout>Dashboard</DashboardLayout>;
}
