import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { Meta, StoryObj } from "@storybook/react-vite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

const queryClient = new QueryClient();

export const Default: Story = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <SignUpForm />
    </QueryClientProvider>
  ),
};
