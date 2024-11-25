import { Meta, StoryObj } from '@storybook/react';
import { PaginationDemo } from '../demo/pagination-demo';

const meta = {
  title: 'Shadcn/Pagination',
  component: PaginationDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PaginationDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pagination: Story = {
  args: {},
};
