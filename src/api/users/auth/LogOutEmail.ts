import { authClient } from "@/lib/auth-client";

export default async function logOutEmail() {
  const { data, error } = await authClient.signOut();

  if (error) {
    throw new Error(error.message || "Sign in failed");
  }

  localStorage.removeItem("expiredDate");

  return data;
}
