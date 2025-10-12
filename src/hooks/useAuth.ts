import { SERVER_URL } from "@/constant/auth";
import { useQuery } from "@tanstack/react-query";

export default function useAuth() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const res = await fetch(`${SERVER_URL}/trpc/auth.getSession`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Not Authenticated");
      }

      const json = await res.json();

      return json.result?.data?.data;
    },
    retry: false,
  });

  return {
    user: data?.user ?? null,
    isAuthenticated: !!data?.user,
    isLoading,
    isError,
  };
}
