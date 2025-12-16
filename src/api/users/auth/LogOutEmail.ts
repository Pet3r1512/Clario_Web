import { SERVER_URL } from "@/constant/auth";

export default async function LogOutEmail() {
  const response = await fetch(`${SERVER_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Unknown Error");
  }

  const result = data?.result?.data;

  return {
    success: true,
    message: result?.message || "Logged Out Successfully",
  };
}
