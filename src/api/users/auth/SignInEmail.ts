import { SERVER_URL } from "@/constant/auth";
import { SignInFormType } from "@/lib/types/signinform";

export default async function SignInEmail(credentials: SignInFormType) {
  const response = await fetch(`${SERVER_URL}/trpc/auth.signInViaEmail`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error.message || "Unknown Error");
  }

  return {
    success: true,
    message: "User Signed In Successfully",
  };
}
