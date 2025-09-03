import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";

export default function DashboardLayout({
  children,
  section,
}: {
  children: ReactNode;
  section?: string;
}) {
  return (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main className="w-full space-y-10">
        <div className="space-y-5">
          <SidebarTrigger />
          <p className="lg:text-3xl font-bold">{section}</p>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
