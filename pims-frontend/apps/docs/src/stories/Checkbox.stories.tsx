import { Meta, StoryObj } from '@storybook/react';
import { CheckboxDemo } from '../demo/checkbox-demo';
import { fn } from '@storybook/test';
import layout from '../app/layout';

const meta = {
  title: 'Shadcn/Checkbox',
  component: (args) => <CheckboxDemo {...args} />,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckBoxDemo: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
