import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

  return (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
