import SignUpForm from "@/components/Auth/SignUp/SignUpForm";
import { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  render: () => <SignUpForm />,
};
