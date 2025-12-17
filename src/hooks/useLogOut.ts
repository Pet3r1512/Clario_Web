import logOutEmail from "@/api/users/auth/LogOutEmail";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async () => {
    try {
      await logOutEmail();
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      localStorage.removeItem("tokenExpiresAt");
      localStorage.removeItem("user");
      localStorage.removeItem("email");

      queryClient.removeQueries({ queryKey: ["auth", "session"] });

      router.navigate({ to: "/auth/signin" });
    }
  };

  return { logout };
}
