import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Settings, MessageCircleQuestion } from "lucide-react";
import { User } from "./User";

const items = [
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
  {
    title: "Helps",
    url: "/helps",
    icon: <MessageCircleQuestion />,
  },
];

export default function SidebarFooter() {
  return (
    <section className="px-5 pb-10">
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.title}>
            <SidebarMenuButton asChild className="lg:hover:bg-gray-200 py-5">
              <a href={item.url} className="text-lg font-semibold">
                {item.icon}
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </div>
        ))}
      </div>
      <User
        user={{
          name: "Peter Pham",
          email: "pttp15122002@gmail.com",
          avatar: "",
        }}
      />
    </section>
  );
}
