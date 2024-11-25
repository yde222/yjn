import { Meta, StoryObj } from '@storybook/react';
import { CardDemo } from '../demo/card-demo';
const meta = {
  title: 'Shadcn/Card',
  component: CardDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CardDemo>;

type Story = StoryObj<typeof meta>;

export const CardNoButtonDemo: Story = {
  args: {},
};
export default meta;
