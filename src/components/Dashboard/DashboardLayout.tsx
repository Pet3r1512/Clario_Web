import { ReactNode, useEffect, useMemo } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import getGlobalCategories from "@/api/categories/getGlobalCategories";

export default function DashboardLayout({
  children,
  section,
}: {
  children: ReactNode;
  section?: string;
}) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const getGlobalCategoriesQuery = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => getGlobalCategories(),
    enabled: !sessionStorage.getItem("globalCategories"),
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/auth/signin", replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  const hasLocalSession = useMemo(() => {
    const tokenExpiresAt = localStorage.getItem("tokenExpiresAt");
    return !!tokenExpiresAt && Date.now() < new Date(tokenExpiresAt).getTime();
  }, []);

  useEffect(() => {
    if (!hasLocalSession) {
      navigate({ to: "/auth/signin", replace: true });
    }
  }, [hasLocalSession, navigate]);

  if (!hasLocalSession) return null;

  if (isLoading) return null;

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
