import { SERVER_URL } from "@/constant/auth";
import { SignUpFormType } from "@/lib/types/signupform";

export default async function SignUpEmail(credentials: SignUpFormType) {
  const response = await fetch(`${SERVER_URL}/api/auth/sign-up/email`, {
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
    message: "User Registered Successfully",
  };
}
