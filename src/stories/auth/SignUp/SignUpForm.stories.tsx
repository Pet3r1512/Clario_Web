import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { Meta, StoryObj } from "@storybook/react-vite";
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
