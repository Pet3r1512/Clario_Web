import { SERVER_URL } from "@/constant/auth";
import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:8787",
  baseURL: SERVER_URL,
  fetchOptions: {
    credentials: "include",
  },
});
