import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

export default function DashboardLayout({
  children,
  section,
}: {
  children: ReactNode;
  section?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({
        to: "/auth/signin",
      });
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <SidebarProvider className="p-5">
      <AppSidebar />
      <main className="w-full max-w-7xl space-y-10">
        <div className="space-y-5">
          <SidebarTrigger />
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">{section}</p>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
