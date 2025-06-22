import Header from "@/components/Layout/Header";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within, screen } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Header> = {
  component: Header,
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
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

export const DesktopHeader: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("navbar")).toBeVisible();

    await expect(canvas.getByTestId("logo-wrapper")).toBeVisible();

    await expect(screen.queryByRole("button")).not.toBeInTheDocument();
  },
};

export const MobileHeader: Story = {
  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("logo-wrapper")).toBeVisible();

    await expect(canvas.getByTestId("navbar")).not.toBeVisible();

    await expect(screen.queryByRole("button")).toBeVisible();
  },
};
