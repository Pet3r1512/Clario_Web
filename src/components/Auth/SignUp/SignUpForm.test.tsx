import { SignUpFormType } from "@/lib/types/signupform";
import { useMutation } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import SignUpForm from "./SignUpForm";
import { userEvent } from "@storybook/testing-library";

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

const mockUseMutation = useMutation as ReturnType<typeof vi.fn>;

function buildMutation(
  overrides: Partial<{ isPending: boolean; mutateFn: () => void }> = {},
) {
  const mutationFn = overrides.mutateFn ?? vi.fn();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  mockUseMutation.mockImplementation((_opts: any) => ({
    mutate: mutationFn,
    isPending: overrides.isPending ?? false,
  }));
  return { mutationFn };
}

function renderForm(className?: string) {
  return render(<SignUpForm className={className} />);
}

async function fillForm({
  email = "test@example.com",
  name = "John Doe",
  password = "Password1",
  confirmPassword = "Password1",
}: Partial<{
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}> = {}) {
  const user = userEvent.setup();

  if (email) {
    await user.type(screen.getByRole("email-input"), email);
  }

  if (name) {
    await user.type(screen.getByRole("name-input"), name);
  }

  if (password) {
    await user.type(screen.getByRole("password"), password);
  }

  if (confirmPassword) {
    await user.type(screen.getByRole("confirmPassword"), confirmPassword);
  }

  return user;
}

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    buildMutation();
  });
});

describe("Rendering", () => {
  it("renders the sign up form container", () => {
    renderForm();
    expect(screen.getByTestId("signup-form-container")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    renderForm();

    expect(screen.getByRole("email-input")).toBeInTheDocument();
    expect(screen.getByRole("name-input")).toBeInTheDocument();
    expect(screen.getByRole("password")).toBeInTheDocument();
    expect(screen.getByRole("confirmPassword")).toBeInTheDocument();
  });

  it("renders the submit button with correct label", () => {
    renderForm();

    expect(screen.getByRole("submit-btn")).toHaveTextContent(
      "Create New Account",
    );
  });

  it("renders the sign in navigation link", () => {
    renderForm();

    const nav = screen.getByRole("signin-nav");
    expect(nav).toBeInTheDocument();
    expect(nav.querySelector("a")).toHaveAttribute("href", "/auth/signin");
  });

  it("renders the Google sign-in button", () => {
    renderForm();

    expect(screen.getByText("Sign In with Google")).toBeInTheDocument();
  });

  it("renders the Calrio brand name", () => {
    renderForm();

    expect(screen.getByTestId("brand-name")).toBeInTheDocument();
    expect(screen.getByTestId("brand-name")).toHaveTextContent("Clario");
  });
  it("applies the className prop to the container", () => {
    renderForm("my-custom-class");

    expect(screen.getByTestId("signup-form-container")).toHaveClass(
      "my-custom-class",
    );
  });
});
