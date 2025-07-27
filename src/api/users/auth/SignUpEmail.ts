import { SignUpFormType } from "@/lib/types/signupform";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default async function SignUpEmail(credentials: SignUpFormType) {
  const response = await fetch(`${SERVER_URL}/trpc/auth.signUpViaEmail`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  console.log(response);

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error || "Unknown Error");
  }

  return {
    success: true,
    message: "User Registered Successfully",
  };
}
