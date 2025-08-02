import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "@storybook/testing-library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const EmptyForm: Story = {
  render: () => <SignUpForm />,
};

export const DefaultForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const signupFormContainer = canvas.getByTestId("signup-form-container");
    expect(signupFormContainer).toBeInTheDocument();

    const clarioText = canvas.getAllByText("Clario");
    expect(clarioText[0]).toBeInTheDocument();

    const loginWithGoogleBtn = canvas.getByText("Login with Google");
    expect(loginWithGoogleBtn).toBeInTheDocument();

    expect(canvas.getByText("Or continue with")).toBeInTheDocument();

    expect(canvas.getByRole("form")).toBeInTheDocument();

    expect(canvas.getByText("Email")).toBeInTheDocument();

    const textboxes = canvas.getAllByRole("textbox");
    expect(textboxes.length).toBe(2);

    const passwordInp = canvas.getByRole("password");
    expect(passwordInp).toBeInTheDocument();

    const confirmPasswordInp = canvas.getByRole("confirmPassword");
    expect(confirmPasswordInp).toBeInTheDocument();

    const submitBtn = canvas.getByRole("submit-btn");
    expect(submitBtn).toBeInTheDocument();

    expect(submitBtn.textContent).toBe("Create New Account");

    const signinNav = canvas.getByRole("signin-nav");
    expect(signinNav).toBeInTheDocument();
  },
};

export const SuccessForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const storybookRoot = document.getElementById("storybook-root");

    const errorMessages = storybookRoot
      ? within(storybookRoot).queryAllByTestId("form-error-msg")
      : [];

    const emailInp = canvas.getByRole("email-input");
    await userEvent.type(emailInp, "exampleemail@gmail.com");

    expect(errorMessages.length).toBe(0);

    const nameInp = canvas.getByRole("name-input");
    await userEvent.type(nameInp, "Example Name");

    expect(errorMessages.length).toBe(0);

    const passwordInp = canvas.getByRole("password");
    await userEvent.type(passwordInp, "15122002P");

    expect(errorMessages.length).toBe(0);

    const confirmPasswordInp = canvas.getByRole("confirmPassword");
    await userEvent.type(confirmPasswordInp, "15122002P");

    expect(errorMessages.length).toBe(0);
  },
};
