import { SERVER_URL } from "@/constant/auth";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const { data, isError, status } = useQuery({
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
    retry: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    user: data?.user ?? null,
    isAuthenticated: !!data?.user,
    isLoading: status === "pending",
    isError,
  };
}
