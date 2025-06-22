import Sidebar from "@/components/Layout/Header/Sidebar";
import { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  globals: {
    viewport: {
      value: "desktop",
      isRotated: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const DesktopSidebar: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId("menu-icon")).not.toBeVisible();
  },
};

export const MobileSidebar: Story = {
  globals: {
    viewport: {
      value: "mobile1",
      isRotated: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const MenuIcon = canvas.getByRole("button");

    await expect(MenuIcon).toBeInTheDocument();

    await userEvent.click(MenuIcon);

    const bodyCanvas = within(document.body);

    await expect(bodyCanvas.getByRole("dialog")).toBeInTheDocument();
  },
};
