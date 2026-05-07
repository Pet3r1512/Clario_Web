import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export default function useFetchSession() {
  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session;
    },
    staleTime: 5 * 60 * 1000, // old after 5 mins
    gcTime: 30 * 60 * 1000, // delete after 30 mins
    refetchOnWindowFocus: false,
  });

  return sessionQuery;
}
