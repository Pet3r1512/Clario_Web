import { SignUpFormType } from "@/lib/types/signupform";
import { vi } from "vitest";

vi.mock("@/api/users/auth/SignUpEmail", () => ({
  default: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(({ onSuccess, onError }) => ({
    mutate: vi.fn(async (credential: SignUpFormType) => {
      try {
        const data = {
          email: credential.email,
          name: credential.name,
          password: credential.password,
          confirmPassword: credential.confirmPassword,
        };
        onSuccess?.(data);
      } catch (err) {
        onError?.(err);
      }
    }),
    isPending: false,
  })),
}));

vi.mock("../SignInViaGoogleBtn", () => ({
  default: () => <button>Sign In with Google</button>,
}));
