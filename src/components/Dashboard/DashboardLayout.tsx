import { ReactNode, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import getGlobalCategories from "@/api/categories/getGlobalCategories";

export default function DashboardLayout({
  children,
  section,
}: {
  children: ReactNode;
  section?: string;
}) {
  const navigate = useNavigate();

  const getGlobalCategoriesQuery = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => getGlobalCategories(),
    enabled: !sessionStorage.getItem("globalCategories"),
  });

  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session;
    },
    retry: false,
  });

  useEffect(() => {
    if (sessionQuery.isFetched && !sessionQuery.data) {
      navigate({ to: "/auth/signin", replace: true });
    }
  }, [sessionQuery.isFetched, sessionQuery.data, navigate]);

  if (!getGlobalCategoriesQuery.isLoading && getGlobalCategoriesQuery.data) {
    sessionStorage.setItem(
      "globalCategories",
      JSON.stringify(
        getGlobalCategoriesQuery.data.globalCategories.globalCategories,
      ),
    );
  }

  if (sessionQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (!sessionQuery.data) {
    return null;
  }

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
