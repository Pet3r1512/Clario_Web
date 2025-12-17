import { SERVER_URL } from "@/constant/auth";

export default async function logOutEmail() {
  const res = await fetch(`${SERVER_URL}/api/auth/sign-out`, {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  // handle 204 / empty bodies safely
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.message ||
      `Sign out failed (${res.status})`;
    throw new Error(msg);
  }

  return {
    success: true,
    message: data?.result?.data?.message || "Logged Out Successfully",
  };
}
