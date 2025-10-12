import { SERVER_URL } from "@/constant/auth";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      try {
        console.log("[useAuth] Fetching session from:", SERVER_URL);

        const res = await fetch(`${SERVER_URL}/trpc/auth.getSession`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        console.log("[useAuth] Response status:", res.status);
        console.log("[useAuth] Response headers:", {
          contentType: res.headers.get("content-type"),
          setCookie: res.headers.get("set-cookie"),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("[useAuth] Response not ok:", text);
          throw new Error(`Not Authenticated: ${res.status}`);
        }

        const json = await res.json();
        console.log("[useAuth] Session data:", json);

        const sessionData = json.result?.data?.data;
        console.log("[useAuth] Extracted user:", sessionData?.user);

        return sessionData;
      } catch (err) {
        console.error("[useAuth] Error:", err);
        throw err;
      }
    },
    retry: 2,
    retryDelay: 500,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  console.log("[useAuth] Current state:", {
    status,
    isLoading,
    isError,
    hasUser: !!data?.user,
    user: data?.user,
  });

  return {
    user: data?.user ?? null,
    isAuthenticated: !!data?.user,
    isLoading,
    isError,
    error,
  };
}
