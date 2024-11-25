import { Meta, StoryObj } from '@storybook/react';
import { CheckboxDisabled } from '../demo/checkbox-disable-demo';

const meta = {
  title: 'Shadcn/Checkbox',
  component: CheckboxDisabled,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxDisabled>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxDemoDisabled: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
