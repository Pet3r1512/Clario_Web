import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Settings, MessageCircleQuestion } from "lucide-react";
import { User } from "./User";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
  {
    title: "Helps",
    url: "/dashboard/helps",
    icon: <MessageCircleQuestion />,
  },
];

export default function SidebarFooter({ currUrl }: { currUrl: string }) {
  return (
    <section className="px-5 pb-10">
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.title}>
            <SidebarMenuButton
              asChild
              className={cn(
                "py-5",
                currUrl === item.url
                  ? "bg-primary text-white lg:hover:bg-primary lg:hover:text-white"
                  : "lg:hover:bg-gray-100",
              )}
            >
              <Link from="/" to={item.url} className="text-lg font-semibold">
                {item.icon}
                <span>{item.title}</span>
              </Link>
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
