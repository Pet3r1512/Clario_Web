import { SERVER_URL } from "@/constant/auth";
import { SignInFormType } from "@/lib/types/signinform";

export default async function SignInEmail(credentials: SignInFormType) {
  const response = await fetch(`${SERVER_URL}/trpc/auth.signInViaEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error?.message || "Unknown error");
  }

  const result = data?.result?.data;

  return {
    success: true,
    message: result?.message || "User Signed In Successfully",
  };
}
