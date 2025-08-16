import {
  Sidebar,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Banknote, Landmark, Coins } from "lucide-react";

const items = [
  {
    title: "Dashboard",
    url: "dashboard/",
    icon: <LayoutDashboard />,
  },
  {
    title: "Transactions",
    url: "dashboard/transactions/",
    icon: <Banknote />,
  },
  {
    title: "Income",
    url: "dashboard/income/",
    icon: <Landmark />,
  },
  {
    title: "Expenses",
    url: "dashborad/expenses/",
    icon: <Coins />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarFooter />
    </Sidebar>
  );
}
