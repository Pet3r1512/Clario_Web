import FeatureCards from "@/components/Layout/Home/Features/FeatureCards";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof FeatureCards> = {
  component: FeatureCards,
  globals: {
    viewport: {
      value: "desktop",
    },
  },
};

export default meta;

type Story = StoryObj<typeof FeatureCards>;

export const Desktop: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("card-hover-effect")).toBeInTheDocument();
  },
};
