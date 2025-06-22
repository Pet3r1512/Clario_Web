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
