import Header from "@/components/Layout/Header";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  render: () => <Header />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const LogoWrapper = canvas.getByTestId("logo-wrapper");

    await expect(LogoWrapper).toBeInTheDocument();

    const Navbar = canvas.getByTestId("navbar");

    await expect(Navbar).toBeInTheDocument();
  },
};
