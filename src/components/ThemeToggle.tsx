import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { cn } from "../lib/utils";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-block">
      <input
        type="checkbox"
        className="peer sr-only"
        aria-label="Toggle theme"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <span
        className={cn(
          "absolute left-1 top-1.5 size-4",
          theme === "light" ? "block" : "hidden",
          "text-yellow-500",
        )}
      >
        <Sun
          size={16}
          className="absolute top-[-2.25px] left-[-0.25px] z-100"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
          />
        </svg>
      </span>
      <span
        className={cn(
          "absolute right-1 top-1.5 size-4",
          theme === "dark" ? "block" : "hidden",
          "text-gray-700",
        )}
      >
        <Moon
          size={16}
          className="absolute top-[-2.25px] left-[-0.25px] z-100"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
          />
        </svg>
      </span>
      <span
        className={cn(
          "block w-10 h-6 rounded-full transition-colors duration-200",
          theme === "dark" ? "bg-gray-300" : "bg-gray-700",
        )}
      ></span>
      <span
        className={cn(
          "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200",
          theme === "dark" ? "translate-x-4" : "",
        )}
      ></span>
    </label>
  );
};

export default ThemeToggle;
