import ThemeToggle from "@/components/ThemeToggle";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Logo from "../Logo";

export default function Sidebar() {
  return (
    <Drawer direction="right">
      <DrawerTrigger data-testid="menu-icon" className="lg:hidden">
        <Menu />
      </DrawerTrigger>
      <DrawerHeader className="hidden">
        <VisuallyHidden className="hidden" asChild>
          <DrawerTitle>Hidden Drawer Title</DrawerTitle>
        </VisuallyHidden>
      </DrawerHeader>
      <DrawerContent className="h-dvh px-5 py-7 !w-2/3 !max-w-sm rounded-r-none flex flex-col gap-y-5">
        <Logo className="h-24" />
        <div className="font-semibold text-lg flex flex-col gap-y-5">
          <a href="/pricing">Pricing</a>
          <div className="flex justify-between items-center">
            <p>Theme</p>
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-y-3.5">
          <a
            className="bg-white shadow-2xl text-primary px-4 py-3 rounded-2xl mt-auto text-center font-semibold border-[1px] border-gray-200"
            href={"/auth/signin"}
          >
            {"Log In"}
          </a>
          <a
            className="bg-primary text-white px-4 py-3 rounded-2xl mt-auto text-center font-semibold"
            href={"/auth/signup"}
          >
            {"Sign Up"}
          </a>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
