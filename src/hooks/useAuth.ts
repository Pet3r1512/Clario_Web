import { SERVER_URL } from "@/constant/auth";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      try {
        const res = await fetch(`${SERVER_URL}/session`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        });

        console.log("[useAuth] Response status:", res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error("[useAuth] Response not ok:", text);
          throw new Error(`Not Authenticated: ${res.status}`);
        }

        const json = await res.json();
        console.log("[useAuth] Session data:", json);

        const sessionData = {
          user: json.user ?? null,
          session: json.session ?? null,
        };

        localStorage.setItem("isAuthenticated", "true");

        return sessionData;
      } catch (err) {
        console.error("[useAuth] Error:", err);
        throw err;
      }
    },
    retry: 1,
    retryDelay: 500,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    gcTime: 1000 * 60 * 10, // garbage collect after 10 minutes
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
    session: data?.session ?? null,
    isAuthenticated: !!data?.user,
    isLoading,
    isError,
    error,
  };
}
