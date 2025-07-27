import { SignUpFormType } from "@/lib/types/signupform";

export default async function SignUpEmail(credentials: SignUpFormType) {
  const response = await fetch(
    " http://localhost:8787/trpc/auth.signUpViaEmail",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    },
  );

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
