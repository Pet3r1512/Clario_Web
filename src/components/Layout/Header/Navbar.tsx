import ThemeToggle from "@/components/ThemeToggle";
import navigations from "@/lib/navigations";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <ul className="flex items-center gap-x-7 text-md lg:text-lg font-semibold">
      <ThemeToggle />
      {navigations.map((nav) => {
        return (
          <li key={nav.name}>
            <a
              className={cn(
                nav.name === "Sign Up"
                  ? "bg-primary text-white px-4 py-3 rounded-2xl lg:hover:bg-primary/85"
                  : "lg:hover:text-primary",
                "transition-all duration-150 ease-linear",
              )}
              href={nav.link}
            >
              {nav.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
