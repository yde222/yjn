import { Input } from '@pims-frontend/ui/components/ui/input';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Shadcn/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },

  args: {
    type: 'text',
    onChange: fn(),
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: [
        'file',
        'password',
        'text',
        'checkbox',
        'radio',
        ' date',
        'datetime-local',
        'email',
        'hidden',
        'image',
        'month',
        'number',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'time',
        'url',
        'week',
      ],
    },
  },
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const InputDefault: Story = {
  args: {
    type: 'text',
    placeholder: 'Name',
  },
};

export const InputFile: Story = {
  args: {
    type: 'file',
    placeholder: 'file',
  },
};

export const InputPassword: Story = {
  args: {
    type: 'password',
    placeholder: 'password',
  },
};
