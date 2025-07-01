import Page from "@/components/Layout/Page";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within } from "@storybook/testing-library";

const meta: Meta<typeof Page> = {
  component: Page,
  globals: {
    viewport: {
      value: "desktop",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Page>;

export const DefaultWithMockContent: Story = {
  render: () => (
    <Page pageName="Mock Page Name">
      <p>This is mock content</p>
    </Page>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("main")).toBeInTheDocument();

    expect(canvas.getByRole("header")).toBeInTheDocument();

    expect(canvas.getByRole("page-body"));

    expect(canvas.getByText("This is mock content")).toBeInTheDocument();
  },
};
