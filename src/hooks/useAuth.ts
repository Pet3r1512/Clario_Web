import { SERVER_URL } from "@/constant/auth";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const rawCookie = typeof document !== "undefined" ? document.cookie : "";
  const cookies = Object.fromEntries(
    rawCookie.split("; ").map((c) => {
      const [key, ...v] = c.split("=");
      return [key, decodeURIComponent(v.join("="))];
    }),
  );
  const token = cookies["__Secure-better-auth.session_token"];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const res = await fetch(`${SERVER_URL}/trpc/auth.getSession`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not Authenticated");

      const json = await res.json();
      return json.result?.data?.data;
    },
    enabled: !token,
    retry: false,
  });

  return {
    user: token ? { token } : (data?.user ?? null),
    isAuthenticated: !!token || !!data?.user,
    isLoading: token ? false : isLoading,
    isError: token ? false : isError,
  };
}
