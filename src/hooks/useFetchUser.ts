import { SERVER_URL } from "@/constant/auth";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUser() {
  const { data } = useQuery({
    queryKey: ["user"],
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

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();

        console.log(json);

        return json;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  });

  return data?.user.id;
}
