import {
  Sidebar,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Banknote, Landmark, Coins } from "lucide-react";
import SidebarFooter from "../Dashboard/Sidebar/SidebarFooter";
import { Link } from "@tanstack/react-router";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: <Banknote />,
  },
  {
    title: "Income",
    url: "/dashboard/income",
    icon: <Landmark />,
  },
  {
    title: "Expenses",
    url: "/dashboard/expenses",
    icon: <Coins />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mb-5" />
      <SidebarGroupContent className="px-5 flex-1">
        <SidebarMenu className="space-y-2.5">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="lg:hover:bg-gray-200 py-5">
                <Link to={item.url} className="text-lg font-semibold">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarFooter />
    </Sidebar>
  );
}
